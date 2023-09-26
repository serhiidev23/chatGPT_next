import Stripe from 'stripe';
import { NextResponse } from "next/server";

async function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;
 
  return new Stripe(key, {
    apiVersion: `2022-11-15`, // update this!
  });
}

async function createStripeCheckout(params) {
  const clientReferenceId = params.organizationId;
  const customer = params.customerId || undefined;
  const mode = 'subscription';
 
  const stripe = await getStripeInstance();
 
  const lineItem = {
    quantity: 1,
    price: params.priceId,
  };
 
  // NB: trimmed for simplicity but use
  // smarter methods for appending the query parameters
  const successUrl = `${params.returnUrl}`;
  const cancelUrl = `${params.returnUrl}`;
  console.log('customer', customer)

  return stripe.checkout.sessions.create({
    mode,
    customer,
    line_items: [lineItem],
    success_url: successUrl,
    cancel_url: cancelUrl,
    // client_reference_id: clientReferenceId,
  });
}

export async function POST(req) {
  const res = NextResponse.next();
	const { organizationId, priceId, customerId, returnUrl } = await req.json();
  console.log(returnUrl)
	
	// NB: here you may want to check that:
	// - the user can update billing
	// - the data sent is correct
	// - the user belongs to the organization in the body
	// we omit it for simplicity, but food for thought!
	
	try {
		const { url } = await createStripeCheckout({
			returnUrl,
			organizationId,
			priceId,
			customerId,
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