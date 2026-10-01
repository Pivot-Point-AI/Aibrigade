"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";

// The blog renders markdown: "#" becomes an h2 and "##" an h3, so the editor's
// "Heading" is level 1 and "Subheading" is level 2.
const BUTTONS = [
  [
    { id: "bold", label: "Bold (Ctrl+B)", text: "B", style: { fontWeight: 800 }, active: (e) => e.isActive("bold"), run: (e) => e.chain().focus().toggleBold().run() },
    { id: "italic", label: "Italic (Ctrl+I)", text: "I", style: { fontStyle: "italic" }, active: (e) => e.isActive("italic"), run: (e) => e.chain().focus().toggleItalic().run() },
    { id: "code", label: "Inline code", text: "</>", active: (e) => e.isActive("code"), run: (e) => e.chain().focus().toggleCode().run() },
  ],
  [
    { id: "h1", label: "Heading", text: "Heading", active: (e) => e.isActive("heading", { level: 1 }), run: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
    { id: "h2", label: "Subheading", text: "Subheading", active: (e) => e.isActive("heading", { level: 2 }), run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  ],
  [
    { id: "ul", label: "Bulleted list", text: "• List", active: (e) => e.isActive("bulletList"), run: (e) => e.chain().focus().toggleBulletList().run() },
    { id: "ol", label: "Numbered list", text: "1. List", active: (e) => e.isActive("orderedList"), run: (e) => e.chain().focus().toggleOrderedList().run() },
    { id: "quote", label: "Quote", text: "“ Quote", active: (e) => e.isActive("blockquote"), run: (e) => e.chain().focus().toggleBlockquote().run() },
  ],
];

export default function RichEditor({ value, onChange, onUploadImage, uploading }) {
  const fileRef = useRef(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: { HTMLAttributes: { class: "adm-codeblock" } } }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image,
      Placeholder.configure({ placeholder: "Start writing your article here. Select text to format it, or use the toolbar above." }),
      Markdown.configure({ html: false, tightLists: true, linkify: false, breaks: false }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "adm-prose adm-rich__area", spellcheck: "true" } },
    onUpdate: ({ editor: e }) => onChange(e.storage.markdown.getMarkdown()),
  });

  if (!editor) return <div className="adm-rich adm-rich--loading">Loading editor...</div>;

  function openLink() {
    setLinkUrl(editor.getAttributes("link").href || "https://");
    setLinkOpen(true);
  }

  function applyLink(e) {
    e.preventDefault();
    const url = linkUrl.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!url || url === "https://") chain.unsetLink().run();
    else chain.setLink({ href: /^(https?:\/\/|mailto:|\/|#)/i.test(url) ? url : `https://${url}` }).run();
    setLinkOpen(false);
  }

  async function onFile(file) {
    if (!file) return;
    const url = await onUploadImage(file);
    if (url) editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") }).run();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="adm-rich">
      <div className="adm-rich__bar" role="toolbar" aria-label="Formatting">
        {BUTTONS.map((group, gi) => (
          <div key={gi} className="adm-tools__group">
            {group.map((b) => (
              <button key={b.id} type="button" title={b.label} aria-label={b.label} style={b.style}
                aria-pressed={b.active(editor)}
                className={`adm-tool${b.active(editor) ? " is-on" : ""}`}
                onMouseDown={(e) => e.preventDefault()} onClick={() => b.run(editor)}>
                {b.text}
              </button>
            ))}
          </div>
        ))}
        <div className="adm-tools__group">
          <button type="button" title="Link (Ctrl+K)" aria-label="Link" aria-pressed={editor.isActive("link")}
            className={`adm-tool${editor.isActive("link") ? " is-on" : ""}`}
            onMouseDown={(e) => e.preventDefault()} onClick={openLink}>Link</button>
          <button type="button" title="Upload and insert image" aria-label="Insert image" className="adm-tool"
            onMouseDown={(e) => e.preventDefault()} onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading..." : "Image"}
          </button>
        </div>
        <div className="adm-tools__group adm-tools__group--end">
          <button type="button" title="Undo" aria-label="Undo" className="adm-tool" disabled={!editor.can().undo()}
            onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().undo().run()}>&#8630;</button>
          <button type="button" title="Redo" aria-label="Redo" className="adm-tool" disabled={!editor.can().redo()}
            onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().redo().run()}>&#8631;</button>
        </div>
      </div>

      {linkOpen && (
        <form className="adm-linkbar" onSubmit={applyLink}>
          <input className="adm-input" autoFocus value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste a link, then press Enter" aria-label="Link address"
            onKeyDown={(e) => e.key === "Escape" && setLinkOpen(false)} />
          <button type="submit" className="adm-btn adm-btn--primary adm-btn--sm">Apply</button>
          {editor.isActive("link") && (
            <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm"
              onClick={() => { editor.chain().focus().extendMarkRange("link").unsetLink().run(); setLinkOpen(false); }}>Remove</button>
          )}
          <button type="button" className="adm-btn adm-btn--quiet adm-btn--sm" onClick={() => setLinkOpen(false)}>Cancel</button>
        </form>
      )}

      <EditorContent editor={editor} className="adm-rich__wrap"
        onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openLink(); } }} />
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden
        onChange={(e) => onFile(e.target.files?.[0])} />
    </div>
  );
}
