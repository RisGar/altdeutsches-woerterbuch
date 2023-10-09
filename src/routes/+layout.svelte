<script lang="ts">
	import "../app.postcss"
	import { page } from "$app/stores"
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Avatar,
		Footer,
		FooterLinkGroup,
		FooterLink,
	} from "flowbite-svelte"
	import { BookSolid } from "flowbite-svelte-icons"
	import { signIn, signOut } from "@auth/sveltekit/client"
	import { onNavigate } from "$app/navigation"

	onNavigate((navigation) => {
		// @ts-expect-error experimental api
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			// @ts-expect-error experimental api
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	$: activeUrl = $page.url.pathname
	$: title = $page.data.title
	$: description = $page.data.description
</script>

<svelte:head>
	<title>{title} | Altdeutsches Wörterbuch</title>
	<meta name="description" content={description} />
</svelte:head>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<BookSolid class="mr-3 h-6 sm:h-9" alt="Buch" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white -md:hidden">
			Altdeutsches Wörterbuch
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if $page.data.session}
			<Button size="sm" on:click={() => signOut()}>Ausloggen</Button>
			<Avatar class="ml-4" rounded href="/words/me" />
		{:else}
			<Button size="sm" on:click={() => signIn()}>Einloggen</Button>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {activeUrl} {hidden} class="order-1">
		<NavLi href="/">Suche</NavLi>
		<NavLi href="/words/list">Liste</NavLi>
		<NavLi href="/words/add">Hinzufügen</NavLi>
	</NavUl>
</Navbar>

<section class="md:max-w-[70vw] max-w-[95vw] mx-auto mt-8">
	<slot />
</section>

<Footer class="sticky top-[100vh] flex">
	<span class="text-sm text-gray-500 sm:text-center">
		© {new Date().getFullYear()} Rishab Garg
	</span>
	<FooterLinkGroup
		ulClass="mt-3 ml-auto text-sm text-gray-500 mt-0 hover:underline focus:underline"
	>
		<FooterLink href="/contact">Kontakt</FooterLink>
	</FooterLinkGroup>
</Footer>
