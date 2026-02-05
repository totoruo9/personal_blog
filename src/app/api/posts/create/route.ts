
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate body if needed
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('posts')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error("Supabase Admin Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
