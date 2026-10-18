import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

/** A release must describe exactly the package version at the tagged commit. */
export function releaseNotes(tag: string, version: string, changelog: string): string {
  if (!/^v(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(tag) || tag !== `v${version}`) {
    throw new Error("Release tag must be vMAJOR.MINOR.PATCH and match package.json");
  }
  const sections = [...changelog.matchAll(/^## \[([^\]]+)\](?: - (\d{4}-\d{2}-\d{2}))?\s*$/gm)];
  const matches = sections.filter((section) => section[1] === version);
  if (matches.length !== 1 || !matches[0][2]) throw new Error("Expected one dated changelog section for this version");
  const section = matches[0];
  const date = new Date(`${section[2]}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== section[2]) throw new Error("Invalid release date");
  const next = sections.find((entry) => entry.index! > section.index!);
  const notes = changelog.slice(section.index! + section[0].length, next?.index ?? changelog.length).trim();
  if (!notes || !/^### /m.test(notes) || !/^- \S/m.test(notes)) throw new Error("Release notes must include a change list");
  return `${notes}\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { version } = JSON.parse(readFileSync("package.json", "utf8")) as { version: string };
  writeFileSync("release-notes.md", releaseNotes(process.env.RELEASE_TAG ?? "", version, readFileSync("CHANGELOG.md", "utf8")));
}
