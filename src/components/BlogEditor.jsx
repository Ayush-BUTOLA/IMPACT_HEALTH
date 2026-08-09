import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus, Table as TableIcon, Image, Video, Undo2, Redo2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, Highlighter
} from 'lucide-react';

export default function BlogEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default heading since we style custom headings or can keep standard
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#5A67F2] underline cursor-pointer'
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-slate-200 w-full my-4'
        }
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-slate-200 bg-slate-50 p-2 font-bold text-left text-xs'
        }
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-200 p-2 text-sm'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: value || '<p>Start writing your clinical article here...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] px-8 py-6 text-slate-800 text-sm leading-relaxed outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-[#1D2A72] [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1D2A72] [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#1D2A72] [&_h3]:mb-2 [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#5A67F2] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-slate-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-[12px] [&_pre]:my-4 [&_pre]:overflow-x-auto [&_table]:border [&_table]:border-slate-200 [&_table]:w-full'
      }
    }
  });

  // Sync editor content with outside value (e.g. when loading a blog to edit)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p>Start writing your clinical article here...</p>');
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  // Helper Actions
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL to link to:', previousUrl);
    
    // cancelled
    if (url === null) return;
    
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertImagePlaceholder = () => {
    editor.chain().focus().insertContent(
      `<div class="my-6 p-6 border-2 border-dashed border-[#5A67F2]/30 rounded-[16px] bg-[#5A67F2]/5 text-center select-none" data-block-type="image-placeholder">
        <div class="text-[#5A67F2] text-2xl mb-1">🖼️</div>
        <div class="font-bold text-[#1D2A72] text-xs">Featured Image Placeholder</div>
        <div class="text-[10px] text-slate-400 mt-1">This slot will render the featured article banner.</div>
      </div>`
    ).run();
  };

  const insertVideoPlaceholder = () => {
    const url = window.prompt('Enter Video Embed URL (e.g., YouTube Link):', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    if (url === null) return;
    editor.chain().focus().insertContent(
      `<div class="my-6 border border-slate-200 rounded-[18px] overflow-hidden aspect-video bg-slate-100 flex flex-col relative select-none" data-block-type="video-placeholder">
        <iframe class="w-full h-full border-0 pointer-events-none" src="${url}" title="Video embed placeholder"></iframe>
        <div class="absolute bottom-2 left-2 bg-[#030050]/80 text-white text-[9px] font-bold px-2 py-1 rounded-[6px]">
          📹 Embedded Video Preview
        </div>
      </div>`
    ).run();
  };

  const ToolbarButton = ({ onClick, isActive, icon: Icon, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-[8px] transition cursor-pointer flex-shrink-0 ${
        isActive 
          ? 'bg-[#1D2A72] text-white' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-[#1D2A72]'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="border border-[#5A67F2]/10 rounded-[20px] bg-white overflow-hidden shadow-sm flex flex-col">
      {/* Notion/Medium Style Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#F8FAFF] border-b border-[#5A67F2]/10 select-none">
        {/* Undo/Redo */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo2} title="Undo" />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo2} title="Redo" />
        
        <div className="w-px h-6 bg-[#5A67F2]/10 mx-1" />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={Heading1} title="Heading 1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={Heading2} title="Heading 2" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={Heading3} title="Heading 3" />

        <div className="w-px h-6 bg-[#5A67F2]/10 mx-1" />

        {/* Formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} title="Bold" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} title="Italic" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={UnderlineIcon} title="Underline" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={Strikethrough} title="Strike" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} icon={Highlighter} title="Highlight" />

        <div className="w-px h-6 bg-[#5A67F2]/10 mx-1" />

        {/* Alignments */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Align Left" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Align Center" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={AlignRight} title="Align Right" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} icon={AlignJustify} title="Align Justify" />

        <div className="w-px h-6 bg-[#5A67F2]/10 mx-1" />

        {/* Lists & Quotes */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={List} title="Bullet List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={ListOrdered} title="Numbered List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={Quote} title="Quote" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={Code} title="Code Block" />

        <div className="w-px h-6 bg-[#5A67F2]/10 mx-1" />

        {/* Special widgets */}
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} icon={LinkIcon} title="Link" />
        <ToolbarButton onClick={insertTable} icon={TableIcon} title="Insert Table" />
        <ToolbarButton onClick={insertImagePlaceholder} icon={Image} title="Insert Image Placeholder" />
        <ToolbarButton onClick={insertVideoPlaceholder} icon={Video} title="Video Embed Placeholder" />
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={Minus} title="Divider Line" />
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 bg-white overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
