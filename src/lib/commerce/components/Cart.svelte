<script lang="ts">
    import { cart } from "../stores/cart";

    import CartEmpty from "$lib/assets/cart-empty.png"
    import CartFull from "$lib/assets/cart-full.png"
</script>

<div class="relative h-12 w-12">
    <img src={($cart.length == 0) ? CartEmpty : CartFull} class="h-12" alt="Cart">

    {#if $cart.length != 0}
        <div class="h-6 w-6 flex justify-center items-center bg-green text-white text-sm rounded-full absolute -top-1 -right-2">
            {$cart.length}
        </div>
    {/if}
</div>