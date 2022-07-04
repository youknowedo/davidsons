<script lang="ts">
	import Section from "$lib/components/Section.svelte"
	import working from "$lib/assets/working.gif"
	import logo from "$lib/assets/DavidsonsB.png"
</script>

<div class="absolute top-0 w-full">
	<div class="container flex items-center py-8">
		<img src={logo} class="h-14" alt="">
		<h1 class="text-xl font-bold ml-2">Davidsons</h1>
	</div>
</div>

<Section class="flex flex-col items-center justify-center h-screen">
    <img src={working} alt="">

    <h2 class="text-2xl font-bold">Vår sida är under konstruktion</h2>
    <p class="text-center">Vi jobbar med det för att ge dig den bästa upplevelsen!</p>
</Section> 