<script lang="ts">
	import { Input, Label, Helper, Button, Toast, Select } from "flowbite-svelte"
	import { enhance } from "$app/forms"
	import Required from "./Required.svelte"
	import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons"
	import type { ActionData, PageData } from "./$types"

	export let data: PageData
	export let form: ActionData

	const types = [
		{ value: "Nomen", name: "Nomen" },
		{ value: "Verb", name: "Verb" },
		{ value: "Adjektiv", name: "Adjektiv" },
		{ value: "Adverb", name: "Adverb" },
		{ value: "Pronomen", name: "Pronomen" },
		{ value: "Präposition", name: "Präposition" },
		{ value: "Konjunktion", name: "Konjunktion" },
		{ value: "Artikel", name: "Artikel" },
		{ value: "Numeral", name: "Numeral" },
		{ value: "Interjektion", name: "Interjektion" },
	]

	const cooldown = 5 * 1000

	$: success = form?.success || false
	$: success && triggerSuccess()
	function triggerSuccess(): void {
		success = true
		setTimeout(() => (success = false), cooldown)
	}

	$: duplicate = form?.duplicate || false
	$: duplicate && triggerDuplicate()
	function triggerDuplicate(): void {
		duplicate = true
		setTimeout(() => (duplicate = false), cooldown)
	}

	$: captcha = form?.captcha || false
	$: captcha && triggerCaptcha()
	function triggerCaptcha(): void {
		captcha = true
		setTimeout(() => (captcha = false), cooldown)
	}
</script>

<Toast color="orange" position="top-right" bind:open={success}>
	<CheckCircleSolid slot="icon" />
	<div>Wort wurde erfolgreich hinzugefügt.</div>
</Toast>

<Toast color="red" position="top-right" bind:open={duplicate}>
	<CloseCircleSolid slot="icon" />
	<div>Wort existiert bereits.</div>
</Toast>

<Toast color="red" position="top-right" bind:open={captcha}>
	<CloseCircleSolid slot="icon" />
	<div>Das Captcha ist inkorrekt.</div>
</Toast>

<form method="post" use:enhance>
	<div class="grid gap-6 mb-4 md:grid-cols-2">
		<div>
			<Label for="word" class="mb-2">Wort<Required /></Label>
			<Input
				type="text"
				id="word"
				name="word"
				placeholder="Wort"
				value={form?.word?.word ?? ""}
				required
			/>
		</div>
		<div>
			<Label for="type" class="mb-2">Wortart<Required /></Label>
			<Select
				id="type"
				name="type"
				items={types}
				value={form?.word?.type ?? ""}
				placeholder="Wortart auswählen"
				required
			/>
		</div>
		<div>
			<Label for="meaning" class="mb-2">Bedeutung<Required /></Label>
			<Input
				type="text"
				id="meaning"
				name="meaning"
				placeholder="Wortbedeutung"
				value={form?.word?.meaning ?? ""}
				required
			/>
		</div>
		<div>
			<Label for="time" class="mb-2">Zeit</Label>
			<Input
				type="text"
				id="time"
				name="time"
				placeholder="18. Jhd."
				value={form?.word?.time ?? ""}
			/>
		</div>
		<div>
			<Label for="origin" class="mb-2">Ursprung</Label>
			<Input type="text" id="origin" name="origin" placeholder="Sprache, Gegend, etc." />
		</div>
		<div>
			<Label for="reasonOfDeath" class="mb-2">Todesursache</Label>
			<Input
				type="text"
				id="reasonOfDeath"
				name="reasonOfDeath"
				placeholder="neues Wort"
				value={form?.word?.reasonOfDeath ?? ""}
			/>
		</div>
	</div>

	<div class="flex mb-6">
		<div class="mt-5">
			{@html data.captcha.data}
		</div>
		<div class="ml-12">
			<Label for="captcha" class="mb-2">Captcha</Label>
			<Input type="number" id="captcha" name="captcha" placeholder="Lösung" />
		</div>
	</div>

	<Button type="submit">Hinzufügen</Button>
	<Helper class="text-sm mt-2">
		<Required /> Pflichtfeld
	</Helper>
</form>
