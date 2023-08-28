<script lang="ts">
	import { Card, Alert, PaginationItem, Button } from "flowbite-svelte"
	import Fuse from "fuse.js"
	import type { PageData } from "./$types"

	export let data: PageData

	const fuse = new Fuse(data.words, {
		keys: ["word", "type", "meaning", "time", "origin", "reasonOfDeath"],
	})
	const search = fuse.search(data.q)

	const resultsPerPage = 20
	const pages: (typeof search)[] = []
	for (let i = 0; i < search.length; i += resultsPerPage) {
		pages.push(search.slice(i, i + resultsPerPage))
	}

	let index = 0

	const previous = () => (result = pages[--index])
	const next = () => (result = pages[++index])

	$: result = pages[index]
</script>

{#if search.length === 0}
	<Alert>Keine Ergebnisse</Alert>
{:else}
	<div class="grid md:grid-cols-2">
		{#each result as res}
			<Card size="md">
				<h3 class="text-2xl text-neutral-800 font-bold mb-6">{res.item.word}</h3>
				<div class="grid gap-4 md:grid-cols-2">
					<p>{res.item.type}</p>
					<p>{res.item.meaning}</p>
					<p>{res.item.time ?? ""}</p>
					<p>{res.item.origin ?? ""}</p>
					<p>{res.item.reasonOfDeath ?? ""}</p>
				</div>
			</Card>
		{/each}
	</div>

	<div class="absolute left-0 right-0 bottom-[10vh]">
		<div class="flex space-x-2 justify-center">
			{#if index > 0}
				<PaginationItem on:click={previous}>Zurück</PaginationItem>
			{:else}
				<Button
					class="flex items-center font-medium h-8 px-3 text-sm rounded-lg border text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
					disabled
				>
					Previous
				</Button>
			{/if}

			{#if index < pages.length - 1}
				<PaginationItem on:click={next}>Weiter</PaginationItem>
			{:else}
				<Button
					class="flex items-center font-medium h-8 px-3 text-sm rounded-lg border text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
					disabled
				>
					Next
				</Button>
			{/if}
		</div>
	</div>
{/if}
