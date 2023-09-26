import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const supabase = createRouteHandlerClient({cookies});
    const {searchParams} = new URL(req.url);
    const code = searchParams.get('code');

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/signin`, req.url));
}