<script lang="ts">
	import { cart } from '$lib/commerce/stores/cart';
	import { goto } from '$app/navigation';

	import { site } from '$lib/supabase/stores/site';
	import Cart from '$lib/commerce/components/Cart.svelte';

	import plant from '$lib/assets/plant.png';

	const addToCart = (id: string) => {
		let tempCart = $cart;
		const index = tempCart.findIndex((value) => value.id == id);
		console.log(index);

		if (index == -1) {
			tempCart.push({ id, amount: 1 });
		} else {
			tempCart[index].amount += 1;
		}

		cart.set(tempCart);
	};
</script>

<div class="bg-yellow/10 py-16 border-b">
	<div class="container">
		<h1 class="text-5xl font-playfair">Shop</h1>
	</div>
</div>

<div class="container grid grid-flow-row grid-cols-5 gap-4 py-12">
	{#each $site?.data.data.products || [] as product}
		<div class="border shadow-md rounded-lg max-h-96">
			<div class="w-full flex justify-center py-12 bg-yellow">
				<img src={plant} class="h-44" alt="" />
			</div>

			<div class="px-6 py-4 h-32">
				<h2 on:click={() => addToCart(product.id)} class="text-lg font-playfair hover:text-green cursor-pointer">{product.title}</h2>
				<p class="text-black/75 line-clamp-2">{product.description}</p>
			</div>
		</div>
	{/each}
</div>
