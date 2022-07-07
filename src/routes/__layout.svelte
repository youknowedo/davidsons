<script lang="ts" context="module">
	import { supabase } from '$lib/supabase/client';

	import { site } from '$lib/supabase/stores/site';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		site.set(
			(
				await supabase
					.from('sites')
					.select()
					.eq('id', import.meta.env.VITE_SITE_ID)
					.single()
			).data
		);

		return {};
	};
</script>

<script>
	import '../app.css';
</script>

<div class="overflow-x-hidden">
	<slot />
</div>
