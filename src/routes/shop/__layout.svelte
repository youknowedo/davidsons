<script>
	import logo from '$lib/assets/DavidsonsB.png';

	import Cart from '$lib/commerce/components/Cart.svelte';
</script>

<div class="z-20 w-full border-b">
	<div class="container flex items-center justify-between py-6">
		<img src={logo} class="h-20" alt="" />

		<Cart small={true} />
	</div>
</div>

<slot />
