
"use client";

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface ToastViewerProps {
    content: string;
}

export default function ToastViewer({ content }: ToastViewerProps) {
    return (
        <div className="toast-viewer-reset">
            <Viewer initialValue={content} />
        </div>
    );
}
