import { error } from "@sveltejs/kit"
import { findAllWords } from "../../../lib/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = function ({ url }) {
	const q = url.searchParams.get("q")
	if (!q) throw error(400, "Keine Suche")

	return {
		q,
		words: findAllWords(),
		title: "Suchergebnisse",
		description: "Ergebnisse der Suche.",
	}
}
