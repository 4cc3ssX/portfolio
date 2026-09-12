import { strict as assert } from "node:assert";
import { test } from "bun:test";
import { linkKind, splitSeriesPart, stripSeriesFooter } from "./taxonomy";

test("splits the Part N suffix off a title", () => {
  assert.deepEqual(
    splitSeriesPart("HTTP Status Codes Aren't Optional - Part 3"),
    { title: "HTTP Status Codes Aren't Optional", part: 3 }
  );
});

test("leaves a title without a part suffix alone", () => {
  assert.deepEqual(splitSeriesPart("REST 101"), { title: "REST 101", part: null });
});

test("does not mistake a mid-title 'part' for a suffix", () => {
  assert.deepEqual(
    splitSeriesPart("Part of the Problem"),
    { title: "Part of the Problem", part: null }
  );
});

test("classifies project links", () => {
  assert.equal(linkKind("https://github.com/4cc3ssX/citygo-app").type, "repository");
  assert.equal(linkKind("https://play.google.com/store/apps/details?id=x").type, "play-store");
  assert.equal(linkKind("https://www.re21.io/").type, "website");
});

test("strips the trailing series link list", () => {
  const body = "## Recap\n\nText here.\n\n## Catch the Full REST API Series\n\n- [Part 1](/blog/a)\n- [Part 2](/blog/b)\n";
  const out = stripSeriesFooter(body);
  assert.ok(out.includes("## Recap"));
  assert.ok(out.includes("Text here."));
  assert.ok(!out.includes("Catch the Full"));
  assert.ok(!out.includes("/blog/a"));
});

test("leaves a body with no series footer untouched apart from trailing space", () => {
  const body = "## Recap\n\nJust text.\n";
  assert.equal(stripSeriesFooter(body), "## Recap\n\nJust text.\n");
});
