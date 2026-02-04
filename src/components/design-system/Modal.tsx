"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/design-system/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/design-system/Card";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

export function Modal({ isOpen, onClose, title, description, children, actionLabel, onAction }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg animate-in zoom-in-95 duration-200">
                <Card className="border-none shadow-2xl bg-white rounded-lg overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4 text-text-secondary" />
                        <span className="sr-only">Close</span>
                    </button>

                    <CardHeader className="bg-background-secondary/50">
                        <CardTitle>{title}</CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </CardHeader>

                    <CardContent className="py-6">
                        {children}
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2 bg-background-secondary/30 py-4">
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        {actionLabel && (
                            <Button onClick={() => { onAction?.(); onClose(); }}>
                                {actionLabel}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
