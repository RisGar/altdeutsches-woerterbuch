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
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
	} from "flowbite-svelte"
	import { Icon } from "flowbite-svelte-icons"
	import { signIn, signOut } from "@auth/sveltekit/client"

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
		<Icon name="book-solid" class="mr-3 h-6 sm:h-9" alt="Buch" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Altdeutsches Wörterbuch
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<NavHamburger on:click={toggle} />
		{#if $page.data.session}
			<Button size="sm" on:click={() => signOut()}>Ausloggen</Button>
			<Avatar class="ml-4" rounded href="/words/me" />
		{:else}
			<Button size="sm" on:click={() => signIn()}>Einloggen</Button>
		{/if}
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

<Footer class="sticky top-[100vh]">
	<span class="block text-sm text-gray-500 sm:text-center">
		© {new Date().getFullYear()} Rishab Garg. Quellcode
		<a class="underline" href="https://github.com/RisGar/altdeutsches-woerterbuch"> hier </a>
		einsehbar.
	</span>
	<FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
		<FooterLink href="/contact">Kontakt</FooterLink>
	</FooterLinkGroup>
</Footer>
