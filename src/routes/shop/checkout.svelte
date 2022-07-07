<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
	import { PaymentElement } from 'svelte-stripe';
	import { cart } from '$lib/commerce/stores/cart';

	let stripe: Stripe | null = null;
	let clientSecret: string | null = null;
	let error: any = null;
	let elements: StripeElements | undefined;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
		// create payment intent server side
		clientSecret = await createPaymentIntent();
	});

	const createPaymentIntent = async () => {
		const response = await fetch('/api/shop/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ cart: $cart })
		});
		const { clientSecret } = await response.json();
		return clientSecret as string | null;
	};

	async function submit() {
		if (processing || elements == undefined) return;
		processing = true;

		const result = await stripe?.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		console.log({ result });
		if (result?.error) {
			error = result.error;
			processing = false;
		} else {
			goto('/examples/payment-element/thanks');
		}
	}
</script>

<h1>Payment Element Example</h1>

{JSON.stringify($cart)}

<nav>
	<a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element"
		>View code</a
	>
</nav>
{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}
{#if stripe && clientSecret}
	<form on:submit|preventDefault={submit}>
		<PaymentElement
			{stripe}
			{clientSecret}
			bind:elements
			theme="flat"
			labels="floating"
			variables={{ colorPrimary: '#7c4dff' }}
			rules={{ '.Input': { border: 'solid 1px #0002' } }}
		/>
		<button disabled={processing}>
			{#if processing}
				Processing...
			{:else}
				Pay
			{/if}
		</button>
	</form>
{:else}
	Loading...
{/if}
