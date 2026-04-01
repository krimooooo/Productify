import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// import { products, users, comments, usersRelations, productsRelations } from "./shema";
import * as schema from "./schema";
import { ENV } from "../config/env";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in the environment variables");
}
// initilize the connection pool to the database using the connection string from the environment variables
const pool = new Pool({
    connectionString: ENV.DATABASE_URL,// connect to our database
});

pool.on("connect",()=>{
    console.log("connected to the database");
})
pool.on("error",()=>{
    console.log("error connecting to the database");
})
// initilize the drizzle orm with the connection pool and the schema
export const db = drizzle({ client: pool,schema}); 
      
  
// what is pool ??
// a connection pool is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. 