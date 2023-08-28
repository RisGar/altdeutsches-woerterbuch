import { SvelteKitAuth } from "@auth/sveltekit"
import EmailProvider from "@auth/core/providers/email"
import {
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD,
	EMAIL_FROM,
	AUTH_SECRET,
} from "$env/static/private"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$lib/db"
import type { AdapterUser } from "@auth/core/adapters"
import type { ExtendedSession } from "./app"

export const handle = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		// @ts-expect-error https://github.com/nextauthjs/next-auth/issues/6174
		EmailProvider({
			server: {
				host: EMAIL_SERVER_HOST,
				port: Number(EMAIL_SERVER_PORT),
				auth: {
					user: EMAIL_SERVER_USER,
					pass: EMAIL_SERVER_PASSWORD,
				},
			},
			from: EMAIL_FROM,
		}),
	],
	callbacks: {
		session({ session, user }: { session: ExtendedSession; user: AdapterUser }) {
			if (session?.user) {
				session = {
					user: {
						...session.user,
						id: user.id,
					},
					expires: session.expires,
				}
			}
			return session
		},
	},
	secret: AUTH_SECRET,
	// TODO env variable NEXT_AUTH_URL or AUTH_URL
	trustHost: true,
})
