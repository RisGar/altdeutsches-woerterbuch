import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"
import Database from "better-sqlite3"
import { eq } from "drizzle-orm"

export type Word = typeof schema.words.$inferSelect
export type NewWord = typeof schema.words.$inferInsert

const sqlite = new Database("database.db")
sqlite.pragma("journal_mode = WAL")
export const db = drizzle(sqlite, { schema })

export function insertWord(word: NewWord): void {
	db.insert(schema.words).values(word).run()
}

export function insertWordReturning(word: NewWord): Word {
	return db.insert(schema.words).values(word).returning().get()
}

export function findAllWords(): Word[] {
	return db.select().from(schema.words).all()
}

export function findWordsForUser(userId: string): Word[] {
	return db.select().from(schema.words).where(eq(schema.words.userId, userId)).all()
}

export function findWord(word: string): Word | undefined {
	return db.select().from(schema.words).where(eq(schema.words.word, word)).get()
}

export function deleteWord(id: number): void {
	db.delete(schema.words).where(eq(schema.words.id, id)).run()
}
