import { supabase, type Site } from '$lib/supabase/client';
import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';

// initialize Stripe
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

// handle POST /create-payment-intent
export const post: RequestHandler = async ({ request }) => {
	const input = await request.json();

	const cart = input.cart as { id: string; amount: number }[];

	let amount = 0;
	let error: unknown;

	const site = (
		await supabase
			.from('sites')
			.select()
			.eq('id', import.meta.env.VITE_SITE_ID)
			.single()
	).data as Site;

	cart.map((cartItem) => {
		const price = site.data.data.products.find((value) => value.id == cartItem.id)?.price;

		if (price) amount = (amount + price * cartItem.amount) * 100;
	});

	let paymentIntent: Stripe.Response<Stripe.PaymentIntent> | undefined;

	try {
		paymentIntent = await stripe.paymentIntents.create({
			amount,
			// note, for some EU-only payment methods it must be EUR
			currency: 'sek',
			// specify what payment methods are allowed
			// can be card, sepa_debit, ideal, etc...
			payment_method_types: ['card']
		});
	} catch (err) {
		error = err;
	}

	// return the clientSecret to the client
	return {
		body: {
			clientSecret: paymentIntent?.client_secret,
			error: error as never
		}
	};
};
