<script lang="ts">
    import { cart } from "../stores/cart";

    import CartEmpty from "$lib/assets/cart-empty.png"
    import CartFull from "$lib/assets/cart-full.png"

    export let small = false

    let cartCount = 0

    for (let i = 0; i < $cart.length; i++) {
        const item = $cart[i];
        
        cartCount += item.amount
    }
    
    cart.subscribe((item) => {
        let count = 0
        for (let i = 0; i < $cart.length; i++) {
            const item = $cart[i];
            
            count += item.amount
        }

        cartCount = count
    })
</script>

<div class="relative {small ? "h-10 w-10" : "h-12 w-12"}">
    <img src={($cart.length == 0) ? CartEmpty : CartFull} class="{small ? "h-10" : "h-12"}" alt="Cart">

    {#if $cart.length != 0}
        <div class="flex justify-center items-center bg-green text-white rounded-full absolute {small ? "h-5 w-5 text-xs -top-1 -right-2" : "h-6 w-6 text-sm -top-1 -right-2"}">
            {cartCount}
        </div>
    {/if}
</div>