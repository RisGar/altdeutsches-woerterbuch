<script lang="ts">
	import { Button, Search } from "flowbite-svelte"
	import { SearchOutline } from "flowbite-svelte-icons"
</script>

<form class="flex gap-2" method="get" action="/words/search">
	<Search size="md" name="q" placeholder="Nach einem Wort suchen" autocomplete="off" />
	<Button class="!p-2.5" type="submit">
		<SearchOutline class="w-5 h-5" />
	</Button>
</form>
