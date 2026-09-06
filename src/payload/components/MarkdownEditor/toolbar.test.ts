/**
 * Runnable check for the markdown transforms — `bun test src/payload`.
 * These are the only non-trivial pure functions in the editor.
 */
import { strict as assert } from "node:assert";
import { test } from "bun:test";
import { EDITOR_ACTIONS, applyAction, buildImageTag } from "./toolbar";

const action = (id: string) => {
  const found = EDITOR_ACTIONS.find((a) => a.id === id);
  if (!found) throw new Error(`no action ${id}`);
  return found;
};

test("wraps a selection", () => {
  const r = applyAction(action("bold"), "hello world", 6, 11);
  assert.equal(r.value, "hello **world**");
  assert.equal(r.value.slice(r.selectionStart, r.selectionEnd), "world");
});

test("unwraps an already-wrapped selection", () => {
  const r = applyAction(action("bold"), "hello **world**", 8, 13);
  assert.equal(r.value, "hello world");
});

test("uses the placeholder on an empty selection", () => {
  const r = applyAction(action("italic"), "", 0, 0);
  assert.equal(r.value, "_italic text_");
});

test("prefixes whole lines even from a mid-line cursor", () => {
  const r = applyAction(action("h2"), "alpha\nbeta", 7, 7);
  assert.equal(r.value, "alpha\n## beta");
});

test("toggles a line prefix off", () => {
  const r = applyAction(action("h2"), "## beta", 0, 7);
  assert.equal(r.value, "beta");
});

test("prefixes every line of a multi-line selection", () => {
  const r = applyAction(action("ul"), "one\ntwo", 0, 7);
  assert.equal(r.value, "- one\n- two");
});

test("inserts a block at the cursor", () => {
  const r = applyAction(action("hr"), "ab", 1, 1);
  assert.equal(r.value, "a\n---\nb");
});

test("image tag carries the attributes the MDX img override reads", () => {
  const tag = buildImageTag({
    src: "https://media.giphy.com/x.gif",
    alt: "a cat",
    sourceUrl: "https://giphy.com/gifs/x",
    priority: true,
  });
  assert.match(tag, /src="https:\/\/media\.giphy\.com\/x\.gif"/);
  assert.match(tag, /data-source="https:\/\/giphy\.com\/gifs\/x"/);
  assert.match(tag, /data-priority="true"/);
  assert.match(tag, /alt="a cat"/);
});

test("image tag escapes quotes so the attribute cannot be broken out of", () => {
  const tag = buildImageTag({ src: 'a".gif', alt: 'b"c' });
  assert.ok(!tag.includes('src="a".gif"'));
  assert.match(tag, /src="a&quot;\.gif"/);
  assert.match(tag, /alt="b&quot;c"/);
});

test("falls back to src when alt is empty", () => {
  assert.match(buildImageTag({ src: "x.gif", alt: "" }), /alt="x\.gif"/);
});
