
import { bigint, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";



export const usersTable = pgTable("leads", {
    uid: varchar("uid", { length: 255 }).notNull().unique().primaryKey(),
    firstName: varchar("first_name", { length: 55 }).notNull(),
    lastName: varchar("last_name", { length: 55 }).notNull(),
    email: varchar("email", { length: 55 }).unique().notNull(),
    phone: bigint("phone_number", { mode: "number" }).unique().notNull(),
})



// run this command in your SQL edittor

// CREATE TABLE leads (
//     uid VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
//     first_name VARCHAR(55) NOT NULL,
//     last_name VARCHAR(55) NOT NULL,
//     email VARCHAR(55) UNIQUE NOT NULL,
//     phone_number BIGINT UNIQUE NOT NULL
//   );

