<script lang="ts">
	import working from "$lib/assets/working.png"
	import florist from "$lib/assets/florist.png"
	import family from "$lib/assets/family.jpg"
	import plant from "$lib/assets/plant.png"
	import logo from "$lib/assets/DavidsonsB.png"

	import { goto } from "$app/navigation";
</script>

<svelte:head>
	<title>Davidsons Gröna Fingrar | Hydroponiska lösningar</title>
	<meta name="description" content="Ett riktigt smart sätt att odla. Genom hydroponiska lösningar odlar vi våra växter i vatten istället för vanlig jord. Spara pengar, vatten och rädda världen du med idag!">
</svelte:head>

<div class="absolute top-0 w-full">
	<div class="container flex items-center py-8 md:py-16">
		<img src={logo} class="h-24" alt="">
	</div>
</div>

<div class="w-full py-52 px-8 md:py-64 flex flex-col justify-center items-center bg-yellow/75 overflow-x-hidden">
	<div class="relative">
		<h1 class="font-playfair font-medium text-5xl md:text-7xl leading-snug mb-12 md:mr-32 lg:mr-96">Ett <u><b>riktigt</b></u> smart<br>sätt att odla</h1>
		<p class="w-80 text-xl md:text-2xl">Genom hydroponiska lösningar odlar vi våra växter i vatten istället för vanlig jord. Spara pengar, vatten och rädda världen du med idag!</p>

		<div class="mt-10">
			<button class="bg-green hover:bg-lime-700 py-3 px-5 md:py-4 md:px-7 rounded-full text-lg md:text-xl text-white duration-200" on:click={() => goto("https://www.facebook.com/davidsonsfritsla")}>Börja Shoppa</button>
			<!-- <button class="text-xl ml-4 border-black border-b-2 pt-[2px] hover:border-transparent hover:pt-[6pt] hover:pb-1 duration-200">Läs mer</button> -->
		</div>
		
		<img src={florist} class="hidden md:block absolute top-32 left-[350px]" alt="">
	</div>
</div>

<div class="container flex justify-center items-center py-24 md:py-32">
	<img src={plant} class="hidden md:block h-96 -mt-12 mr-16" alt="">
	<div class="md:w-1/2">
		<h2 class="font-playfair font-bold text-4xl leading-loose text-center md:text-left">Om Oss</h2>
		<p class="text-center md:text-left">Davidsons grundades av Aldwin Velazco tillsammans med hans syskon. Aldwins intresse för odling började när han hjälpte till hans föräldrar och morföräldrar att odla kaffebönor och annanas. Hans intresse för hydroponik började efter hans examen från college när han läste om en jordbruksartikel om hydroponik. Detta ledde till att han startade hydrogården i ACV Agri-Farm i Silang, Filippinerna. Nu startar han nytt i Sverige och hjälper andra komma igång med hydroponik</p>
		<!-- <button class="text-xl mt-6 border-black border-b-2 pt-[6px] mb-1 hover:border-transparent hover:mb-0 hover:pb-1 duration-200">Läs mer</button> -->
	</div>
</div>

<footer class="bg-green flex justify-center items-center text-white py-4 text-center">
	2021-{new Date().getFullYear()} &copy; Davidssons Gröna Fingrar HB. Alla rättigheter förbehållna.
</footer>