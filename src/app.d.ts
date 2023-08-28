// See https://kit.svelte.dev/docs/types#app

import type { Session } from "@auth/core/types"
import type { ExtendedSession } from "./hooks.server"

declare interface ExtendedSession extends Session {
	user?: {
		name?: string | null
		email?: string | null
		image?: string | null
		id?: string | null
	}
}

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession(): Promise<ExtendedSession | null>
		}
		interface PageData {
			session: ExtendedSession | null
			title: string
			description: string
		}
		// interface Platform {}
	}
}

export { ExtendedSession }
