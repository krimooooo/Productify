import { pgTable,text,timestamp,uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// this file is used to define the schema of the database by sue drizzle orm and to define the relations between the tables


// this the table of the users in the database
export const users = pgTable("users",
    {
    id:text("id").primaryKey(),// clerk id from clerk
    email:text("email").notNull(),
    name:text("name"),
    // key is the name of the table and value is the schema of the table
    imageUrl:text("image_url"),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updateAt:timestamp("updated_at").notNull().defaultNow(),
    // the date and time when the user was created and updated
   })

//this is the table of the products in the database
export const products=pgTable("products",{
    id:uuid("id").primaryKey().defaultRandom(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    userId:text("user_id")
    .notNull()
    .references(()=>users.id,{onDelete:"cascade"}),
    // caascade means that if the user is deleted then all the products of that user will be deleted
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updateAt:timestamp("updated_at").notNull().defaultNow()
});

//this is the table of the commandsin the database
export const comments=pgTable("comments",{
    id:uuid("id").primaryKey().defaultRandom(),
    content:text("content").notNull(),
    // this is for user
    userId:text("user_id")
    .notNull()
    .references(()=>users.id,{onDelete:"cascade"}),
    // this is for product
    productId:uuid("product_id")
    .notNull()
    .references(()=>products.id,{onDelete:"cascade"}),
    // caascade means that if the user is deleted then all the products of that user will be deleted
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updateAt:timestamp("updated_at").notNull().defaultNow()
});


// realation defines the relation between the tables
export const usersRelations=relations(users,({many}) =>({
    products:many(products),
    comments:many(comments)
}));

export const productsRelations=relations(products,({many,one}) =>({
    comments:many(comments),
    user:one(users,{fields:[products.userId],references:[users.id]}),
}));

export const commentsRelations=relations(comments,({one}) =>({
    user:one(users,{fields:[comments.userId],references:[users.id]}),
    products:one(products,{fields:[comments.productId],references:[products.id]}),
}));

// use an objets to export all the tables and relations

// this is the type inference of the database
export type User=typeof users.$inferSelect;// this is the type of the user table
export type NewUser=typeof users.$inferInsert;// this is the type of the user table

export type Product=typeof products.$inferSelect;// this is the type of the product table
export type NewProduct=typeof products.$inferInsert;// this is the type of the product table

export type Comment=typeof comments.$inferSelect;// this is the type of the comment table
export type NewComment=typeof comments.$inferInsert;// this is the type of the comment table