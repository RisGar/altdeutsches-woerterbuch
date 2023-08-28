<script lang="ts">
	import { page } from "$app/stores"
</script>

<h1 class="mb-4 text-3xl font-bold text-gray-900">Error</h1>
<h1>{$page.error?.message}</h1>
