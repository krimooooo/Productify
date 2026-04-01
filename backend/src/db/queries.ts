import { db } from "./index";
import { users, products, comments ,type NewComment,type NewProduct,type NewUser, users, users } from "./schema";
import { desc, eq } from "drizzle-orm";
 
/*
  use with ::
  to automatically join related data 

*/




// User queries
// this is the function to create a new user in the database
export const createUser = async (data:NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
};
// async is used to make the function asynchronous 
// and await is used to wait for the promise to resolve before returning the user


// User Queries 
export const getUserById = async (id:string) => {
    const user = await db.query.users.findFirst({where:eq(users.id,id)});
    return user;
}

export const updateUser=async(id:string,data:Partial<NewUser>)=>{
    const [user]=await db.update(users).set(data).where(eq(users.id,id)).returning();
    return user;
}

export const upsertUser=async(data:NewUser)=>{
    // const exiteingUser=await getUserById(data.id);
    // if(exiteingUser) return updateUser(data.id,data);
    // return createUser(data);
    const[user]=await db
       .insert(users)
       .values(data).
       onConflictDoUpdate(
        {
            target:users.id,
            set:data
        }).returning();
        // onConflictDoUpdate is used to update the user if the user already exists in the database
        return user;
}

// Product Queries
export const createPrroduct = async (data:NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
};
// this is the function to get all the products from the database
export const get_all_products=async()=>{
    return db.query.products.findMany({
        with:{user:true},
        orderBy:(products,{desc})=>[desc(products.createdAt)],
    });
}
// this is the function to get a product by id from the database
export const get_product_by_id=async(id:string)=>{
    return db.query.products.findFirst(
        {
            where:eq(products.id,id),
            with:{
                user:true,
                comments:{
                with:{user:true},
                orderBy:(comments,{desc})=>[desc(comments.createdAt)],
               }
          }
        });
}
// this is the function to update a product by user id from the database
export const get_products_by_user_id=async(user_id:string)=>{
    return db.query.products.findMany({
        where:eq(products.userId,user_id),
        with:{// with here to fetch the user details
            user:true,
        },
        orderBy:(products,{desc})=>[desc(products.createdAt)],
    })
}
// the word partial is used to make all the properties of the NewProduct type optional
export const update_products_by_id=async(id:string,data:Partial<NewProduct>)=>{
    // if not exist 
    const existingProduct=await get_product_by_id(id);
    if(!existingProduct) {
        throw new Error("Product not found");
    }
    const [product]=await db.update(products).set(data).where(eq(products.id,id)).returning();
    return product;

}
// delete produccts from database
export const delete_product_by_id=async(id:string)=>{
      // if not exist 
    const existingProduct=await get_product_by_id(id);
    if(!existingProduct) {
        throw new Error("Product not found");
    }
   const [product]= await db.delete(products).where(eq(products.id,id)).returning();
    return product;
}

// Comment Queries 
export const create_comments=async(data:NewComment)=>{
    const [comment]=await db.insert(comments).values(data).returning();
    return comment;
}
export const get_comment_by_id=async(id:string)=>{
    return db.query.comments.findFirst({
        where:eq(comments.id,id),
          with:{
            user:true,
          }
    })
}

export const delete_comments=async(id:string)=>{
      // if not exist 
    const existComment=await get_comment_by_id(id);
    if(!existComment) {
        throw new Error(`Comment with ID ${id} not found`);
    }
    const [comment]=await db.delete(comments).where(eq(comments.id,id)).returning();
    return comment;
}
