import { strict as assert } from "node:assert";
import { test } from "bun:test";
import { estimateReadingTime } from "./reading-time";

test("never returns less than one minute", () => {
  assert.equal(estimateReadingTime("hi"), 1);
});

test("counts roughly 200 prose words per minute", () => {
  assert.equal(estimateReadingTime("word ".repeat(400)), 2);
});

test("counts code at a reduced weight rather than discarding it", () => {
  const code = "```ts\n" + "const x = 1;\n".repeat(200) + "```";
  // 800 code words at 0.4 => 320 weighted => 2 min. Discarding them gives 1.
  assert.ok(estimateReadingTime(code) > 1);
});

test("ignores html tags and image markup", () => {
  const withImg = '<img src="https://x/y.gif" alt="a" data-source="https://z" />\n' + "word ".repeat(200);
  assert.equal(estimateReadingTime(withImg), 1);
});
