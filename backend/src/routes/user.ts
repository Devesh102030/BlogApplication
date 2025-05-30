import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import { signUpObject, signInObject} from "@deveshparyani/medium-common";


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

export const getPrismaClient = (datasourceUrl: string) => {
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
};

userRouter.post('/signup', async (c) => {
  
    const body = await c.req.json(); //way to get the body in Hono

    const {success} = signUpObject.safeParse(body);

    if(!success){
        console.log("Error");
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }
    
    const prisma = getPrismaClient(c.env.DATABASE_URL);

    try{
        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: body.password,
                name: body.name || "Anonymous"
            }
        })
        
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        })
    }
    catch(e){
        //console.log(e); 
        c.status(403);
        return c.json({
            msg: "Error creating user"
        })
    }
})

userRouter.post("/signin", async (c) => {
    const body = await c.req.json(); //way to get the body in Hono

    const {success} = signInObject.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    try{
        const user = await prisma.user.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })

        if(!user){
            c.status(403);
            return c.json({
                msg: "Invalid Credentials"
            })
        }

        const token = await sign({id : user.id}, c.env.JWT_SECRET)

        return c.json({
            jwt: token
        })
    }
    catch(e){
        console.log(e);
        
        c.status(403);
        return c.json({
            msg: "Error signing in"
        })
    }
})