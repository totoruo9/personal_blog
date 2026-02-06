
"use client";

import { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface ToastEditorProps {
    initialValue: string;
    onChange: (value: string) => void;
    height?: string;
    initialEditType?: 'markdown' | 'wysiwyg';
}

export default function ToastEditor({
    initialValue,
    onChange,
    height = "600px",
    initialEditType = "markdown"
}: ToastEditorProps) {
    const editorRef = useRef<Editor>(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        if (editorRef.current && !isInternalChange.current) {
            const instance = editorRef.current.getInstance();
            const currentVal = instance.getMarkdown();
            if (currentVal !== initialValue) {
                instance.setMarkdown(initialValue || "");
            }
        }
    }, [initialValue]);

    const handleChange = () => {
        if (editorRef.current) {
            isInternalChange.current = true;
            const instance = editorRef.current.getInstance();
            onChange(instance.getMarkdown());
            // Reset flag after a short delay or allow external updates again
            setTimeout(() => { isInternalChange.current = false; }, 0);
        }
    };

    const onUploadImage = async (blob: Blob, callback: (url: string, altText: string) => void) => {
        const formData = new FormData();
        formData.append("file", blob);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.url) {
                callback(data.url, 'image');
            } else {
                alert("Image upload failed: " + (data.error || "Unknown error"));
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("Upload failed: " + error.message);
        }
    };

    return (
        <Editor
            initialValue={initialValue || " "} // Toast UI bugs out with empty string sometimes
            previewStyle="vertical"
            height={height}
            initialEditType={initialEditType}
            useCommandShortcut={true}
            ref={editorRef}
            onChange={handleChange}
            toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock']
            ]}
            hooks={{
                addImageBlobHook: onUploadImage
            }}
        />
    );
}
