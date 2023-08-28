import { findAllWords } from "$lib/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = function () {
	return {
		words: findAllWords(),
		title: "Liste",
		description: "Tabellarische Liste aller Wörter",
	}
}
