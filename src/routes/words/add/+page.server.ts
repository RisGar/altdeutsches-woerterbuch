/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import type { NewWord } from "$lib/db"
import { findWord, insertWord } from "$lib/db"
import { fail } from "@sveltejs/kit"
import svgCaptcha from "svg-captcha"

let captcha: svgCaptcha.CaptchaObj

export const load: PageServerLoad = async function (event) {
	const session = await event.locals.getSession()
	if (!session?.user) throw redirect(303, "/auth/signin")

	captcha = svgCaptcha.createMathExpr({ mathMax: 20, mathOperator: "+-" })

	return {
		title: "Wort hinzufügen",
		description: "Formular zum Hinzufügen eines Wortes in das Altdeutsche Wörterbuch.",
		captcha,
	}
}

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession()
		if (!session?.user?.id) throw redirect(303, "/auth/signin")

		const data = await event.request.formData()

		const word: NewWord = {
			word: data.get("word")!.toString(),
			type: data.get("type")!.toString(),
			meaning: data.get("meaning")!.toString(),
			time: data.get("time")?.toString() || null,
			origin: data.get("origin")?.toString() || null,
			reasonOfDeath: data.get("reasonOfDeath")?.toString() || null,
			userId: session.user.id,
		}

		if (data.get("captcha")!.toString() !== captcha.text) return fail(400, { word, captcha: true })

		if (findWord(word.word)) {
			return fail(400, { word, duplicate: true })
		}

		insertWord(word)

		return { success: true }
	},
}
