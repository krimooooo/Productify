// this is the dist folder
// tsc:: use to compile code from typeSc to javaSc

// testOne

// console.log('hey from index.ts file ')
// const numb1:number =10;
// const numb2:number =30;

// console.log(numb1+numb2);

// testTwo
import express from "express";
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'

const app=express();
app.use(clerkMiddleware());// this will add the user object to the request object if the user is authenticated
app.use(express.json());


app.get("/",(req,res)=>{
  res.json({ success:true});

});
app.get("/",(req,res)=>{
  res.json({
    message:"Welcome to the backend API",
    endpoint:{
      users:"/api/v1/users",
      posts:"/api/v1/posts",
      comments:"/api/v1/comments"
    }
  }
  );

});
app.listen(ENV.PORT,()=>console.log("Server is running on  port :"+ENV.PORT));