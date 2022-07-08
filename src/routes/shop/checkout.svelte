<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
	import { PaymentElement } from 'svelte-stripe';
	import { cart } from '$lib/commerce/stores/cart';
	import { site } from '$lib/supabase/stores/site';

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

	let amount = 0;
	$cart.map((cartItem) => {
		const price = $site?.data.data.products.find((value) => value.id == cartItem.id)?.price;

		if (price) amount = amount + price * cartItem.amount;
	});

	const createPaymentIntent = async () => {
		const response = await fetch('/api/shop/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ cart: $cart })
		});
		const intent = await response.json();
		error = intent.error;

		return intent.clientSecret as string | null;
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

<div class="bg-yellow/10 py-16 border-b">
	<div class="container">
		<h1 class="text-5xl font-playfair">Checkout</h1>
	</div>
</div>

{#if $cart.length > 0}
	<div class="container flex py-16">
		<div class="w-1/2 pr-4">
			{#if error}
				<p class="error">{error.message || error.raw.message} Please try again.</p>
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
				</form>
			{:else}
				Loading...
			{/if}
		</div>

		<div class="w-96 mx-auto h-fit pl-4">
			<div class="p-8">
				<h2 class="text-2xl font-playfair">Cart</h2>
				<table class="table-auto text-left w-full">
					<tbody>
						{#each $cart as item}
							<tr class="h-12">
								<td class="py-2">
									{$site?.data.data.products.find((value) => value.id == item.id)?.title}
									<b>x{item.amount}</b>
								</td>
								<td class="py-2 text-right">
									{$site?.data.data.products.find((value) => value.id == item.id)?.price} kr
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			
			<div class="p-8 pt-0">
				<div class="flex justify-between">
					<h4 class="text-3xl font-playfair">Totalt</h4>
					<h3 class="text-3xl font-playfair">{amount} kr</h3>
				</div>
				
				<button
					class="bg-green w-full py-3 rounded-full text-lg text-white mt-8"
					disabled={processing || !stripe || !clientSecret}
				>
					{#if processing}
						Processing...
					{:else if !stripe || !clientSecret}
						Loading...
					{:else}
						Pay
					{/if}
				</button>
			</div>
		</div>
	</div>
{:else}
	<div class="container p-8">Nothing in cart</div>
{/if}
