<script lang="ts">
	import { cart } from '$lib/commerce/stores/cart';
	import { goto } from '$app/navigation';

	import { site } from '$lib/supabase/stores/site';
	import Cart from '$lib/commerce/components/Cart.svelte';

	import plant from '$lib/assets/plant.png';
	import type { Product } from '$lib/supabase/client';

	let currentItem: Product | undefined;

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
				<h2
					on:click={() => (currentItem = product)}
					class="text-lg font-playfair hover:text-green cursor-pointer"
				>
					{product.title}
				</h2>
				<p class="text-black/75 line-clamp-2">{product.description}</p>
			</div>
		</div>
	{/each}
</div>

{#if currentItem}
	<div class="z-20 absolute top-0 left-0 h-screen w-screen bg-black/50">'ello</div>
	<div
		on:click={(e) => {
			if (e.target == e.currentTarget) currentItem = undefined;
		}}
		class="z-30 absolute top-0 left-0 h-screen w-screen flex justify-center items-center"
	>
		<div class="bg-white rounded-lg">
			<div class="flex border-b">
				<div class="p-8 border-r">
					<div class="flex justify-center items-center bg-yellow h-[320px] w-[480px]">
						<img src={plant} class="h-44" alt="" />
					</div>
				</div>

				<div class="m-8 w-64 flex flex-col justify-between">
					<div>
						<h1 class="text-2xl font-playfair cursor-pointer">{currentItem.title}</h1>
						<p class="text-black/75 line-clamp-2">{currentItem.description}</p>
					</div>
					<div class="flex items-center justify-between duration-200">
						{#if $cart.findIndex((item) => item.id == currentItem?.id) != -1}
							<span class="text-green"
								>{$cart.find((item) => item.id == currentItem?.id)?.amount}x</span
							>
							<div class="h-6 w-[1px] bg-gray-200" />
						{/if}
						<button
							class="bg-green hover:bg-lime-700 py-3 rounded-full text-white duration-200 inline-block {$cart.findIndex(
								(item) => item.id == currentItem?.id
							) == -1
								? 'w-full'
								: 'w-[85%]'}"
							on:click={() => addToCart(currentItem?.id || '')}
						>
							Lägg Till i Kundvagn
						</button>
					</div>
				</div>
			</div>

			<div class="flex p-6">
				{#each $site?.data.data.products || [] as product}
					<div class="w-44 m-2">
						<div class="flex justify-center items-center bg-yellow h-20 w-44">
							<img src={plant} class="h-16" alt="" />
						</div>

						<div class="py-4">
							<h2
								on:click={() => (currentItem = product)}
								class="font-playfair hover:text-green cursor-pointer"
							>
								{product.title}
							</h2>
							<p class="text-black/75 text-sm line-clamp-2">{product.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
