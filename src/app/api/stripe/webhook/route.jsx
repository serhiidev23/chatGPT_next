import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { createClient } from "@supabase/supabase-js";

const StripeWebhooks = {
  AsyncPaymentSuccess: 'checkout.session.async_payment_succeeded',
  Completed: 'checkout.session.completed',
  PaymentFailed: 'checkout.session.async_payment_failed',
  SubscriptionDeleted: 'customer.subscription.deleted',
  SubscriptionUpdated: 'customer.subscription.updated',
}

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

async function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;
 
  return new Stripe(key, {
    apiVersion: `2022-11-15`, // update this!
  });
}

function buildOrganizationSubscription(
  subscription,
  status = OrganizationPlanStatus.Paid
) {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;
 
  return {
    id: subscription.id,
    priceId: price?.id,
    status,
    currency: lineItem.price.currency ?? null,
    interval: price?.recurring?.interval ?? null,
    intervalCount: price?.recurring?.interval_count ?? null,
    createdAt: subscription.created,
    periodStartsAt: subscription.current_period_start,
    periodEndsAt: subscription.current_period_end,
    trialStartsAt: subscription.trial_start ?? null,
    trialEndsAt: subscription.trial_end ?? null,
  };
}

function getOrderStatus(status) {
	return status
}

async function setOrganizationSubscription(subscriptionData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase
      .from('users')
      .update({ 'subscription': subscriptionData.subscription.id, 'release_date':subscriptionData.subscription.createdAt  })
      .eq('customer_id', subscriptionData.customerId)

	return subscriptionData;
}

async function onCheckoutCompleted(
	session,
  subscription
) {
  const organizationId = session.client_reference_id;
  const customerId = session.customer;
  
  // status can either be PAID or AWAITING_PAYMENT (if asynchronous)
  const status
     = getOrderStatus(session.payment_status);
 
  const subscriptionData 
    = buildOrganizationSubscription(subscription, status);
  
  // use your DB methods to 
  // set organization.subscription=subscriptionData
 
  return await setOrganizationSubscription({
    organizationId,
    customerId,
    subscription: subscriptionData,
  });
}

async function activatePendingSubscription (organizationId) {
}

async function deleteOrganizationSubscription (subscription_id) {
	return subscription_id;
}

async function onSubscriptionUpdated (subscription) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  console.log(subscription.cancel_at, subscription.customer)

  if (subscription.cancel_at) {
    const { error } = await supabase
    .from('users')
    .update({ 'subscription': null  })
    .eq('customer_id', subscription.customer)
  }
  else {
    const { error } = await supabase
    .from('users')
    .update({ 'subscription': subscription.id, 'release_date': subscription.plan.created  })
    .eq('customer_id', subscription.customer)
  }
}

function onPaymentFailed (session) {
}

function internalServerErrorException(res) {
	return 'stripe error'
}

export async function POST(
  req,
) {
  const res = NextResponse.next();
  const signature = req.headers.get(STRIPE_SIGNATURE_HEADER);
  const rawBody = await req.text();
  const stripe = await getStripeInstance();
 
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  // NB: if stripe.webhooks.constructEvent fails, it would throw an error
 
  // here we handle each event based on {event.type}
 
  try {
    console.log(event.type)
    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object;
        const subscriptionId = session.subscription;
 
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
 
        await onCheckoutCompleted(session, subscription);
 
        break;
      }
 
      case StripeWebhooks.AsyncPaymentSuccess: {
        const session = event.data.object;
        const organizationId = session.client_reference_id;
 
        await activatePendingSubscription(organizationId);
 
        break;
      }
 
      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object;
 
        await deleteOrganizationSubscription(subscription.id);
 
        break;
      }
 
      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object;
 
        await onSubscriptionUpdated(subscription);
 
        break;
      }
 
      case StripeWebhooks.PaymentFailed: {
        const session = event.data.object;
 
        // TODO: handle this properly
        onPaymentFailed(session);
 
        break;
      }
    }
 
    return NextResponse.json({ status: "success" });
  } catch (e) {
    return internalServerErrorException(res);
  }
}