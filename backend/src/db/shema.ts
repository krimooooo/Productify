import { pgTable,text,timestamp,uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// this file is used to define the schema of the database by sue drizzle orm and to define the relations between the tables


// key is the name of the table and value is the schema of the table

// this the table of the users in the database
export const users = new pgTable("users",
    {
    id:text("id").primaryKey(),// clerkid from clerk
    email:text("email").notNull(),
    name:text("name"),
    imageUrl:text("image_url"),
    createdAt:timestamp("created_at",{mode:"timestamp_ms"}).notNull().defaultNow(),
    updateAt:timestamp("updated_at",{mode:"timestamp_ms"}).notNull().defaultNow(),
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
    createdAt:timestamp("created_at",{mode:"timestamp_ms"}).notNull().defaultNow(),
    updateAt:timestamp("updated_at",{mode:"timestamp_ms"}).notNull().defaultNow()
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
    createdAt:timestamp("created_at",{mode:"timestamp_ms"}).notNull().defaultNow(),
    updateAt:timestamp("updated_at",{mode:"timestamp_ms"}).notNull().defaultNow()
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