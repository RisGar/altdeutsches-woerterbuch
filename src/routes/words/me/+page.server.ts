import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { findWordsForUser } from "$lib/db"

export const load: PageServerLoad = async function (event) {
	const session = await event.locals.getSession()
	if (!session?.user) throw redirect(303, "/auth/signin")
	return {
		words: findWordsForUser(session.user.id!),
		title: "Meine Wörter",
		description: "Übersicht aller Wörter, die von dem aktuellen Benutzer erstellt wurden.",
	}
}
