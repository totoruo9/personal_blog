"use client";

import { useState } from "react";
import { Button } from "@/components/design-system/Button";
import { Wand2 } from "lucide-react";
import { AIGeneratorWizard } from "@/components/admin/AIGeneratorWizard";

export function AIGeneratorButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
                <Wand2 className="w-4 h-4" />
                AI 콘텐츠 작성
            </Button>
            <AIGeneratorWizard isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
