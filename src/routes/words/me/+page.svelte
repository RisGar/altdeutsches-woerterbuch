<script lang="ts">
	import {
		Button,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
	} from "flowbite-svelte"
	import type { PageData } from "./$types"
	export let data: PageData
	import { TrashBinSolid } from "flowbite-svelte-icons"
	import type { Word } from "$lib/db"

	let searchTerm = ""
	$: filtered = data.words
		.filter((e) => e.word.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
		.sort()

	async function deleteWord(item: Word) {
		await fetch("/words/delete", {
			method: "POST",
		})
	}
</script>

<TableSearch placeholder="Nach einem Wort suchen" hoverable={true} bind:inputValue={searchTerm}>
	<caption class="p-5 text-3xl font-semibold text-left text-gray-900 bg-white">
		Alle Wörter
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			Liste aller Wörter im Altdeutschen Wörterbuch, alphabetisch sortiert und durchsuchbar.
		</p>
	</caption>
	<TableHead>
		<TableHeadCell>Wort</TableHeadCell>
		<TableHeadCell>Wortart</TableHeadCell>
		<TableHeadCell>Bedeutung</TableHeadCell>
		<TableHeadCell>Zeit</TableHeadCell>
		<TableHeadCell>Ursprung</TableHeadCell>
		<TableHeadCell>Todesursache</TableHeadCell>
		<TableHeadCell>Entfernen</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filtered as item}
			<TableBodyRow>
				<TableBodyCell>{item.word}</TableBodyCell>
				<TableBodyCell>{item.type}</TableBodyCell>
				<TableBodyCell>{item.meaning}</TableBodyCell>
				<TableBodyCell>{item.time ?? ""}</TableBodyCell>
				<TableBodyCell>{item.origin ?? ""}</TableBodyCell>
				<TableBodyCell>{item.reasonOfDeath ?? ""}</TableBodyCell>
				<TableBodyCell>
					<Button class="!p-2" on:click={() => deleteWord(item)}>
						<TrashBinSolid class="w-5 h-5" />
					</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
