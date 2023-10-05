import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString: string = process.env.DATABASE_URL!
const client = postgres(connectionString)

export const db = drizzle(client);

if (db) {
    console.log(`Database connected successfully`)
} else {
    console.log(`Failed to connect to database`)
}