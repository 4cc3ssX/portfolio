import { strict as assert } from "node:assert";
import { test } from "bun:test";
import { isAnimatedSrc } from "./images";

test("detects a plain .gif", () => {
  assert.equal(isAnimatedSrc("https://x.com/a.gif"), true);
});

test("detects a giphy CDN url with a query string", () => {
  assert.equal(
    isAnimatedSrc("https://media3.giphy.com/media/v1.Y2lk/Lopx9eUi34rbq/giphy.gif?cid=abc"),
    true
  );
});

test("detects a giphy url with no file extension", () => {
  assert.equal(isAnimatedSrc("https://media4.giphy.com/media/v1.abc/qJzZ4"), true);
});

test("leaves static formats optimized", () => {
  assert.equal(isAnimatedSrc("https://x.com/a.png"), false);
  assert.equal(isAnimatedSrc("https://x.com/a.jpeg"), false);
});

test("handles missing src", () => {
  assert.equal(isAnimatedSrc(undefined), false);
  assert.equal(isAnimatedSrc(null), false);
});

test("does not match a hostname that merely contains giphy", () => {
  assert.equal(isAnimatedSrc("https://notgiphy.example.com/a.png"), false);
});
