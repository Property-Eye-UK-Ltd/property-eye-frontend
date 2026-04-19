import * as React from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { ModalShell } from "@/components/modals/ModalShell"
import { Button } from "@/components/ui/button"
import {
    TextBold,
    TextItalic,
    TextUnderline,
    TextalignLeft,
    TextalignCenter,
    TextalignRight,
} from "iconsax-react"
import { cn } from "@/lib/utils"

interface EditTemplateModalProps {
    isOpen: boolean
    onClose: () => void
    template: {
        title: string
        content: string
        type: string
    } | null
    onSave: (newContent: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    const buttons = [
        {
            icon: <TextBold size={18} variant={editor.isActive('bold') ? 'Bold' : 'Outline'} />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            title: "Bold"
        },
        {
            icon: <TextItalic size={18} variant={editor.isActive('italic') ? 'Bold' : 'Outline'} />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            title: "Italic"
        },
        {
            icon: <TextUnderline size={18} variant={editor.isActive('underline') ? 'Bold' : 'Outline'} />,
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline'),
            title: "Underline"
        },
        {
            type: "separator"
        },
        {
            icon: <TextalignLeft size={18} variant="Outline" />,
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: editor.isActive({ textAlign: 'left' }),
            title: "Align Left"
        },
        {
            icon: <TextalignCenter size={18} variant="Outline" />,
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: editor.isActive({ textAlign: 'center' }),
            title: "Align Center"
        },
        {
            icon: <TextalignRight size={18} variant="Outline" />,
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: editor.isActive({ textAlign: 'right' }),
            title: "Align Right"
        }
    ]

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
            {buttons.map((btn, i) => (
                btn.type === "separator" ? (
                    <div key={i} className="w-px h-6 bg-border mx-1" />
                ) : (
                    <button
                        key={i}
                        type="button"
                        onClick={btn.onClick}
                        className={cn(
                            "p-2 rounded-md transition-colors hover:bg-muted",
                            btn.isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                        )}
                        title={btn.title}
                    >
                        {btn.icon}
                    </button>
                )
            ))}
        </div>
    )
}

export const EditTemplateModal = ({ isOpen, onClose, template, onSave }: EditTemplateModalProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['paragraph'],
            }),
        ],
        content: template?.content || "",
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[200px] p-4 text-sm leading-relaxed prose prose-sm max-w-none',
            },
        },
    })

    // Update editor content when template changes
    React.useEffect(() => {
        if (editor && template) {
            editor.commands.setContent(template.content)
        }
    }, [template, editor])

    const handleSave = () => {
        if (editor) {
            onSave(editor.getHTML())
            onClose()
        }
    }

    if (!template) return null

    return (
        <ModalShell open={isOpen} onClose={onClose} contentClassName="max-w-2xl rounded-3xl bg-white pb-0 pt-0">
            <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white">
                {/* Header */}
                <div className="bg-primary px-8 py-6 text-left shrink-0">
                    <h2 className="text-2xl font-medium text-white">Edit Template</h2>
                    <p className="text-sm text-white/70 font-medium">
                        Modify the {template.type} template for "{template.title}"
                    </p>
                </div>

                {/* Content Area */}
                <div className="bg-muted px-6 py-8 overflow-y-auto scrollbar-super-thin">
                    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
                        <div className="rounded-2xl border border-border overflow-hidden bg-background focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} />
                        </div>

                        <div className="p-5 bg-muted/40 rounded-2xl border border-border/50">
                            <h4 className="text-xs font-medium text-primary mb-3 uppercase tracking-wider">
                                Available Variables
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {["[Agency Name]", "[Property Address]", "[Period]", "[Time]", "[X]"].map((v) => (
                                    <span key={v} className="px-3 py-1.5 bg-white border border-border rounded-xl text-[10px] font-mono text-primary font-medium">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white px-8 py-6 shrink-0">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-full bg-muted px-8 py-3.5 text-sm font-medium text-foreground sm:flex-1 transition-colors hover:bg-muted/80"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white sm:flex-1 transition-colors hover:bg-primary/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </ModalShell>
    )
}
