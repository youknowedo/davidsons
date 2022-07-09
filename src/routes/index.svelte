<script lang="ts">
	import working from '$lib/assets/working.png';
	import florist from '$lib/assets/florist.png';
	import family from '$lib/assets/family.jpg';
	import plant from '$lib/assets/plant.png';
	import vase1 from '$lib/assets/vase-1.png';
	import vase2 from '$lib/assets/vase-2.png';
	import wateringCan from '$lib/assets/watering-can.png';
	import logo from '$lib/assets/DavidsonsB.png';

	import { goto } from '$app/navigation';
	import { site } from '$lib/assets/supabase/stores/site';

	const page = $site?.pages[0]
</script>

<svelte:head>
	<title>{$site?.site_info.title} | {$site?.site_info.tagline}</title>
	<meta
		name="description"
		content="Ett riktigt smart sätt att odla. Genom hydroponiska lösningar odlar vi våra växter i vatten istället för vanlig jord. Spara pengar, vatten och rädda världen du med idag!"
	/>
</svelte:head>

<div class="overflow-x-hidden">
	<div class="z-20 absolute top-0 w-full">
		<div class="container flex items-center py-8 md:py-16">
			<img src={logo} class="h-24" alt="" />
		</div>
	</div>
	
	<div
		class="w-full py-52 px-8 md:py-64 flex flex-col justify-center items-center bg-yellow/75 relative"
	>
		<div class="z-10 relative">
			<h1 class="font-playfair font-medium text-5xl md:text-7xl md:leading-snug mb-12 md:mr-32 lg:mr-96">
				{@html page?.sections[0].heading}
			</h1>
			<p class="w-80 text-xl md:text-2xl">
				{@html page?.sections[0].body}
			</p>
	
			<div class="mt-10">
				<button
					class="bg-green hover:bg-lime-700 py-3 px-5 md:py-4 md:px-7 rounded-full text-lg md:text-xl text-white duration-200"
					on:click={() => goto(page?.sections[0].ctas[0]?.url || "")}>{@html page?.sections[0].ctas[0]?.text}</button
				>
				<!-- <button class="text-xl ml-4 border-black border-b-2 pt-[2px] hover:border-transparent hover:pt-[6pt] hover:pb-1 duration-200">Läs mer</button> -->
			</div>
	
			<img src={florist} class="hidden md:block absolute top-32 left-[350px]" alt="" />
			
		</div>
	
		<img src={vase1} class="z- 10 block md:hidden absolute h-64 right-16 -bottom-8 rotate-12" alt="vase">
		<img src={wateringCan} class="block md:hidden absolute h-44 -right-16 -top-8 -rotate-45" alt="vase">
	</div>
	
	<div class="container flex justify-center items-center py-32 md:py-32">
		<img src={plant} class="hidden md:block h-96 -mt-12 mr-16" alt="" />
		<div class="md:w-1/2">
			<h2 class="font-playfair font-bold text-4xl leading-loose text-center md:text-left">{@html page?.sections[1].heading}</h2>
			<p class="text-center text-lg md:text-left">
				{@html page?.sections[1].body}
			</p>
			<!-- <button class="text-xl mt-6 border-black border-b-2 pt-[6px] mb-1 hover:border-transparent hover:mb-0 hover:pb-1 duration-200">Läs mer</button> -->
		</div>
	</div>
	
	<footer class="bg-green flex justify-center items-center text-white py-4 px-12 text-center">
		<div>
			2021-{new Date().getFullYear()} &copy; Davidssons Gröna Fingrar HB. Alla rättigheter förbehållna.
			Sida av
			<a href="https://seabird.digital" class="ml-1 text-yellow underline hover:no-underline"
				>Seabird Digital</a
			>
		</div>
	</footer>
</div>

