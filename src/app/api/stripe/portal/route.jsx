import Stripe from 'stripe';
import { NextResponse } from "next/server";

async function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;
 
  return new Stripe(key, {
    apiVersion: `2022-11-15`, // update this!
  });
}

export async function POST(req) {
  const res = NextResponse.next();
	const { customerId, returnUrl } = await req.json();
	
	// NB: here you may want to check that:
	// - the user can update billing
	// - the data sent is correct
	// - the user belongs to the organization in the body
	// we omit it for simplicity, but food for thought!
	
	try {
        const stripe = await getStripeInstance();

        const { url } = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: returnUrl,
        });
	
		// redirect user back based on the response
		return NextResponse.json({ status: "success", url });
		// return res.redirect(303, url);
	} catch (e) {
		console.error(e, `Stripe Checkout error`);
		// either end request or ideally redirect users to the same URL
		// but using a query parameter such as error=true
		return NextResponse.json({ status: "failed", message: 'error' });
	}
}