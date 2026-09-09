"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  Image as ImageIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertTag = (startTag: string, endTag: string = "") => {
    const textarea = document.getElementById("rte-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${startTag}${selectedText || "teks"}${endTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, end + startTag.length);
    }, 0);
  };

  const handleImageInsert = () => {
    const url = prompt("Masukkan URL gambar:");
    if (url) {
      insertTag(`<img src="${url}" alt="Gambar artikel" className="rounded-2xl my-4 w-full" />`);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden space-y-0 shadow-2xs">
      {/* Toolbar */}
      <div className="p-2 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertTag("<strong>", "</strong>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<em>", "</em>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-stone-200 mx-1"></span>
          <button
            type="button"
            onClick={() => insertTag("<h2>", "</h2>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold shadow-2xs transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<h3>", "</h3>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold shadow-2xs transition-colors"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-stone-200 mx-1"></span>
          <button
            type="button"
            onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<ol>\n  <li>", "</li>\n</ol>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<code>", "</code>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<blockquote>", "</blockquote>")}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleImageInsert}
            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs shadow-2xs transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-stone-200/60 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "write" ? "bg-emerald-600 text-white shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "preview" ? "bg-emerald-600 text-white shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === "write" ? (
        <textarea
          id="rte-textarea"
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tuliskan konten artikel menggunakan HTML / Markdown tags..."
          className="w-full p-4 bg-stone-50/50 text-stone-900 placeholder-stone-400 font-mono text-sm focus:outline-none focus:bg-white resize-y min-h-[280px] transition-colors"
        />
      ) : (
        <div className="p-6 bg-white min-h-[280px] prose max-w-none text-stone-800 text-sm leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-emerald-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
          <div dangerouslySetInnerHTML={{ __html: value || "<p className='text-stone-400 italic'>Pratinjau konten kosong...</p>" }} />
        </div>
      )}
    </div>
  );
}
