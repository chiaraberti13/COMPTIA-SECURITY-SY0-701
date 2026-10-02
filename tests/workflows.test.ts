import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const WORKFLOW_DIR = join(process.cwd(), ".github", "workflows");

const workflows = readdirSync(WORKFLOW_DIR)
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => ({ name, text: readFileSync(join(WORKFLOW_DIR, name), "utf8") }));

/** Every `uses:` reference in a workflow, with the file and line it sits on. */
const references = workflows.flatMap(({ name, text }) =>
  text.split("\n").flatMap((line, index) => {
    const match = line.match(/^\s*(?:-\s*)?uses:\s*(\S+)(.*)$/);
    return match ? [{ where: `${name}:${index + 1}`, ref: match[1], rest: match[2] }] : [];
  })
);

describe("GitHub Actions workflows", () => {
  it("exist and reference at least one action", () => {
    expect(workflows.length).toBeGreaterThan(0);
    expect(references.length).toBeGreaterThan(0);
  });

  it("pin every third-party action to a full commit SHA", () => {
    // Local actions (./path) and container images (docker://) are not tags.
    const unpinned = references
      .filter(({ ref }) => !ref.startsWith("./") && !ref.startsWith("docker://"))
      .filter(({ ref }) => !/^[\w.-]+\/[\w./-]+@[0-9a-f]{40}$/.test(ref))
      .map(({ where, ref }) => `${where} ${ref}`);
    expect(unpinned).toEqual([]);
  });

  it("record the pinned release next to every SHA", () => {
    const undocumented = references
      .filter(({ ref }) => /@[0-9a-f]{40}$/.test(ref))
      .filter(({ rest }) => !/#\s*v\d+(\.\d+){0,2}\b/.test(rest))
      .map(({ where, ref }) => `${where} ${ref}`);
    expect(undocumented).toEqual([]);
  });

  it("declare explicit permissions", () => {
    const missing = workflows
      .filter(({ text }) => !/^permissions:/m.test(text))
      .map(({ name }) => name);
    expect(missing).toEqual([]);
  });
});

describe("secret scan", () => {
  // .gitleaks.toml uses top-level [[allowlists]] with targetRules, read only
  // from gitleaks 8.25.0. An older binary ignores them without an error, and
  // the weekly full-history scan fails on identifiers (2026-09-28).
  it("pins a gitleaks version that understands the allowlists of .gitleaks.toml", () => {
    const config = readFileSync(".gitleaks.toml", "utf8");
    const security = workflows.find((w) => w.name === "security.yml")!.text;
    const pinned = security.match(/GITLEAKS_VERSION:\s*"?(\d+)\.(\d+)\.(\d+)"?/);
    expect(pinned, "set GITLEAKS_VERSION on the gitleaks step").not.toBeNull();
    const [major, minor] = [Number(pinned![1]), Number(pinned![2])];
    if (/^\[\[allowlists\]\]/m.test(config)) expect(major > 8 || (major === 8 && minor >= 25), `gitleaks ${pinned![0]}`).toBe(true);
  });
});

describe("dependency licences", () => {
  /** The licences the Dependency review job accepts on a pull request. */
  const allowed = new Set(
    (readFileSync(".github/workflows/security.yml", "utf8").match(/allow-licenses:\s*(.+)/)?.[1] ?? "")
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean)
  );
  /** Packages exempted by name (allow-dependencies-licenses), as npm names. */
  const exempted = (readFileSync(".github/workflows/security.yml", "utf8").match(/allow-dependencies-licenses:\s*(.+)/)?.[1] ?? "")
    .split(",")
    .map((purl) => decodeURIComponent(purl.trim().replace(/^pkg:npm\//, "")))
    .filter(Boolean);
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8")) as {
    packages: Record<string, { license?: string | { type?: string }; dev?: boolean }>;
  };

  it("are all in the Dependency review allow-list, so an update with a new one is noticed here first", () => {
    expect(allowed.size).toBeGreaterThan(0);
    const outside = Object.entries(lock.packages)
      .filter(([path]) => path !== "" && !exempted.includes(path.replace(/^.*node_modules\//, "")))
      .map(([path, p]) => [path, typeof p.license === "object" ? p.license?.type : p.license] as const)
      .filter(([, license]) => !license || !allowed.has(license))
      .map(([path, license]) => `${path}: ${license ?? "no licence"}`);
    expect(outside).toEqual([]);
  });

  it("exempt only named development packages, never something the app ships", () => {
    for (const name of exempted) {
      const entries = Object.entries(lock.packages).filter(([path]) => path.endsWith(`node_modules/${name}`));
      expect(entries.length, name).toBeGreaterThan(0);
      for (const [path, p] of entries) expect(p.dev, `${path} must be a development dependency`).toBe(true);
    }
  });

  it("never allow a strong copyleft licence", () => {
    expect([...allowed].filter((l) => /^(A|L)?GPL|SSPL|EUPL/i.test(l))).toEqual([]);
  });
});

describe("bundled font licences", () => {
  // OFL-1.1 requires every copy of the fonts to carry their copyright notice
  // and licence: public/ is copied into the build next to them.
  it.each(["inter", "jetbrains-mono"])("ships the OFL notice of %s with the app", (font) => {
    const text = readFileSync(`public/licenses/${font}-OFL-1.1.txt`, "utf8");
    expect(text).toMatch(/^Copyright \d{4} /);
    expect(text).toContain("SIL Open Font License, Version 1.1");
  });
});


describe("release safeguards", () => {
  it("checks the tagged build before creating a draft with its SBOM", () => {
    const release = workflows.find((w) => w.name === "release.yml")!.text;
    expect(release).toContain("git merge-base --is-ancestor HEAD origin/main");
    expect(release).toContain("npx tsx scripts/release.ts");
    for (const check of ["npm run check", "npm audit --omit=dev", "npm run build", "npm run smoke"]) {
      expect(release.indexOf(check)).toBeGreaterThan(0);
      expect(release.indexOf(check)).toBeLessThan(release.indexOf("gh release create"));
    }
    expect(release).toContain("npm sbom --omit dev --sbom-format cyclonedx");
    expect(release).toContain("--verify-tag --draft");
    expect(release).toContain("app.tar.gz sbom.cdx.json SHA256SUMS");
    expect(release).toContain('RELEASE_TAG: ${{ github.ref_name }}');
    expect(release).not.toMatch(/run:.*\$\{\{ github\.ref_name/);
  });
});
