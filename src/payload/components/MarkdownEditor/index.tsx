"use client";

import { useCallback, useRef, useState } from "react";
import type { TextareaFieldClientComponent } from "payload";
import { FieldLabel, toast, useField, useListDrawer } from "@payloadcms/ui";

import { EDITOR_ACTIONS, applyAction, buildImageTag } from "./toolbar";
import type { EditorAction } from "./toolbar";
import "./styles.scss";

interface MediaDoc {
  id: string;
  url?: string | null;
  alt?: string | null;
  sourceUrl?: string | null;
  mimeType?: string | null;
}

/**
 * Markdown editor for `posts.content`.
 *
 * Content is stored as markdown rather than Lexical so the existing MDX render
 * pipeline keeps working untouched — including the raw <img> tags that make
 * animated GIFs render with a source caption. Preview is Payload's own Live
 * Preview iframe (the real frontend route), so there is no second renderer
 * here to drift out of sync.
 */
export const MarkdownEditor: TextareaFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [gifOpen, setGifOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [MediaDrawer, , { openDrawer: openMediaDrawer }] = useListDrawer({
    collectionSlugs: ["media"],
  });

  const replaceSelection = useCallback(
    (transform: (current: string, start: number, end: number) => {
      value: string;
      selectionStart: number;
      selectionEnd: number;
    }) => {
      const el = textareaRef.current;
      const current = value ?? "";
      const start = el?.selectionStart ?? current.length;
      const end = el?.selectionEnd ?? current.length;

      const result = transform(current, start, end);
      setValue(result.value);

      // Restore the caret after React commits the new value.
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(result.selectionStart, result.selectionEnd);
      });
    },
    [setValue, value]
  );

  const runAction = useCallback(
    (action: EditorAction) =>
      replaceSelection((current, start, end) => applyAction(action, current, start, end)),
    [replaceSelection]
  );

  const insertText = useCallback(
    (text: string) =>
      replaceSelection((current, start, end) => ({
        value: current.slice(0, start) + text + current.slice(end),
        selectionStart: start + text.length,
        selectionEnd: start + text.length,
      })),
    [replaceSelection]
  );

  const onSelectMedia = useCallback(
    (doc: unknown) => {
      const media = doc as MediaDoc;
      if (!media?.url) return;
      insertText(
        buildImageTag({
          src: media.url,
          alt: media.alt ?? "",
          sourceUrl: media.sourceUrl ?? undefined,
        })
      );
    },
    [insertText]
  );

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const images = Array.from(files).filter((file) => file.type.startsWith("image/"));
      if (images.length === 0) return;

      setUploading(true);
      try {
        for (const file of images) {
          const body = new FormData();
          body.append("file", file);
          body.append("_payload", JSON.stringify({ alt: file.name.replace(/\.[^.]+$/, "") }));

          const response = await fetch("/api/media", {
            method: "POST",
            body,
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`Upload failed (${response.status})`);
          }

          const { doc } = (await response.json()) as { doc: MediaDoc };
          if (doc?.url) {
            insertText(buildImageTag({ src: doc.url, alt: doc.alt ?? file.name }));
          }
        }
      } catch (error) {
        console.error("[MarkdownEditor] upload failed", error);
        toast.error(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [insertText]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      const shortcut = { b: "bold", i: "italic" }[event.key.toLowerCase()];
      if (!shortcut) return;
      event.preventDefault();
      const action = EDITOR_ACTIONS.find((a) => a.id === shortcut);
      if (action) runAction(action);
    },
    [runAction]
  );

  return (
    <div className="markdown-editor">
      <FieldLabel label={field?.label} required={field?.required} path={path} />

      <div className="markdown-editor__toolbar">
        {EDITOR_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            title={action.title}
            className="markdown-editor__btn"
            onClick={() => runAction(action)}
          >
            {action.label}
          </button>
        ))}

        <span className="markdown-editor__spacer" />

        <button
          type="button"
          className="markdown-editor__btn markdown-editor__btn--wide"
          onClick={openMediaDrawer}
        >
          Insert media
        </button>
        <button
          type="button"
          className="markdown-editor__btn markdown-editor__btn--wide"
          onClick={() => setGifOpen(true)}
        >
          Insert GIF
        </button>
      </div>

      {gifOpen && (
        <GifDialog
          onCancel={() => setGifOpen(false)}
          onInsert={(payload) => {
            insertText(buildImageTag({ ...payload, priority: true }));
            setGifOpen(false);
          }}
        />
      )}

      <textarea
        ref={textareaRef}
        className="markdown-editor__textarea"
        value={value ?? ""}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        onPaste={(event) => {
          const files = event.clipboardData?.files;
          if (files?.length) {
            event.preventDefault();
            void uploadFiles(files);
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          if (event.dataTransfer?.files?.length) {
            event.preventDefault();
            void uploadFiles(event.dataTransfer.files);
          }
        }}
        spellCheck
        rows={28}
      />

      <div className="markdown-editor__footer">
        <span>
          Markdown + GFM. Drag, drop or paste an image to upload it.
          {uploading ? " Uploading…" : ""}
        </span>
        <span>{(value ?? "").length.toLocaleString()} chars</span>
      </div>

      {showError && <div className="markdown-editor__error">{errorMessage}</div>}

      <MediaDrawer onSelect={({ doc }: { doc: unknown }) => onSelectMedia(doc)} />
    </div>
  );
};

const GifDialog = ({
  onCancel,
  onInsert,
}: {
  onCancel: () => void;
  onInsert: (payload: { src: string; alt: string; sourceUrl?: string }) => void;
}) => {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const isValid = /^https:\/\/\S+$/i.test(src.trim());

  return (
    <div className="markdown-editor__dialog">
      <label>
        GIF URL
        <input
          autoFocus
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          placeholder="https://media.giphy.com/media/…/giphy.gif"
        />
      </label>
      <label>
        Alt text
        <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the GIF" />
      </label>
      <label>
        Source page <span>(optional — shown as the caption credit)</span>
        <input
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://giphy.com/gifs/…"
        />
      </label>
      <div className="markdown-editor__dialog-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={() =>
            onInsert({
              src: src.trim(),
              alt: alt.trim(),
              sourceUrl: sourceUrl.trim() || undefined,
            })
          }
        >
          Insert
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
