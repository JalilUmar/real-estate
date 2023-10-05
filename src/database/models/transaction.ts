import { bigint, pgTable, text, varchar } from "drizzle-orm/pg-core";



export const transactionTable = pgTable("transaction_table", {
    uid: varchar("uid", { length: 255 }).notNull().unique().primaryKey(),
    firstName: varchar("first_name", { length: 55 }).notNull(),
    lastName: varchar("last_name", { length: 55 }).notNull(),
    email: varchar("email", { length: 55 }).unique().notNull(),
    phone: bigint("phone_number", { mode: "number" }).unique().notNull(),
    title: varchar("title", { length: 55 }).notNull(),
    address: varchar("address", { length: 55 }).notNull(),
    city: varchar("city", { length: 55 }).notNull(),
    url: text("url").unique().notNull()
})



// run this command in you SQL editor

// CREATE TABLE transaction_table (
//     uid VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
//     first_name VARCHAR(55) NOT NULL,
//     last_name VARCHAR(55) NOT NULL,
//     email VARCHAR(55) UNIQUE NOT NULL,
//     phone_number BIGINT UNIQUE NOT NULL,
//     title VARCHAR(55) NOT NULL,
//     address VARCHAR(55) NOT NULL,
//     city VARCHAR(55) NOT NULL ,
//     url TEXT() NOT NULL UNIQUE
//   );
