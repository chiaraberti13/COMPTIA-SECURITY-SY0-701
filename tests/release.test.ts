import { describe, expect, it } from "vitest";
import { releaseNotes } from "../scripts/release";

const changelog = "## [Unreleased]\n\n### Added\n\n- Future change\n\n## [1.2.3] - 2026-10-02\n\n### Fixed\n\n- Released fix\n\n## [1.2.2] - 2026-09-30\n\n### Added\n\n- Older change\n";
describe("release validation", () => {
  it("extracts only the tagged version, excluding future and previous changes", () => {
    expect(releaseNotes("v1.2.3", "1.2.3", changelog)).toBe("### Fixed\n\n- Released fix\n");
  });
  it.each(["v1.2.4", "1.2.3", "v01.2.3", "v1.2.3-rc.1", "v1.2.3;echo bad"])("rejects invalid or mismatched tag %s", (tag) => {
    expect(() => releaseNotes(tag, "1.2.3", changelog)).toThrow();
  });
  it("refuses missing, undated, duplicate and empty release notes", () => {
    for (const text of ["## [Unreleased]", changelog.replace(" - 2026-10-02", ""), changelog.replace("2026-10-02", "2026-02-30"), changelog + "\n## [1.2.3] - 2026-10-02", "## [1.2.3] - 2026-10-02\n\n### Fixed\n"]) {
      expect(() => releaseNotes("v1.2.3", "1.2.3", text)).toThrow();
    }
  });
});
