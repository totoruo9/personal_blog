"use client";

import { useEffect, useRef } from "react";
import { incrementDailyStats } from "@/lib/posts";

export function VisitorTracker() {
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent double counting in React Strict Mode (dev)
        if (initialized.current) return;
        initialized.current = true;

        incrementDailyStats();
    }, []);

    return null;
}
