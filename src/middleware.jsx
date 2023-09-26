import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

async function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;
 
  return new Stripe(key, {
    apiVersion: `2022-11-15`, // update this!
  });
}

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && ["/signup", "/signin"].includes(req.nextUrl.pathname)) {
    console.log("hook");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user && ['/subscription', '/summarizer', '/verify', '/wassistant'].includes(req.nextUrl.pathname))
  {
    console.log("unauthorized");
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  
  const { data: profile, error } = await supabase
    .from('users')
    .select(`subscription,customer_id`)
    .eq('id', user?.id)
    .single()

  if (user && !profile?.subscription && ['/summarizer', '/verify', '/wassistant'].includes(req.nextUrl.pathname))
  {
    return NextResponse.redirect(new URL('/subscription', req.url));
  }

  // create customer in stripe 
  if (profile && !profile?.customer_id) {
    const stripe = await getStripeInstance();
    const customer = await stripe.customers.create({
			email: profile.email,
      name: profile.username
		});

		const { error } = await supabase
			.from('users')
			.update({ customer_id: customer.id })
			.eq('id', user.id);
  }
  
  return res;
}

export const config = {
  matcher: ["/:path*"],
  runtime: 'experimental-edge', // for Edge API Routes only
  unstable_allowDynamic: [
    // '/lib/utilities.js', // allows a single file
    '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
  ],
};
