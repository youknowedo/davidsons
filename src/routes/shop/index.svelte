<script lang="ts">
	import { cart } from '$lib/commerce/stores/cart';
	import { goto } from '$app/navigation';

	import { site } from '$lib/supabase/stores/site';
import Cart from '$lib/commerce/components/Cart.svelte';

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

<Cart/>

{JSON.stringify($cart)}

{#each $site?.data.data.products || [] as product}
	<h1>{product.title}</h1>
	<button on:click={() => addToCart(product.id)}>Add To Cart</button>
{/each}
<button on:click={() => goto('/shop/checkout')}>Checkout</button>
