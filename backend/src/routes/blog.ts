import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import { createBlogObject, updateBlogObject } from "@deveshparyani/medium-common"; 

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    c.set("userId", String(user.id));
    await next();
  } catch (err) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});


export const getPrismaClient = (datasourceUrl: string) => {
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
};

blogRouter.post("/", async (c)=>{
    const body = await c.req.json();
    const authorid = c.get("userId");

    const {success} = createBlogObject.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    try{
        const blog = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorid: authorid
            }
        })

        return c.json({
            id: blog.id
        })
    }
    catch(e){
        c.status(403);
        return c.json({
            message: "Error posting blog"
        })
    }
})

blogRouter.put("/",async (c)=>{ 
    const body = await c.req.json();
    const {success} = updateBlogObject.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    try{
        const blog = await prisma.post.update({
            where:{
                id : body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: blog.id
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            message: "Error updating blog"
        })
    }
})

blogRouter.get("/bulk", async (c)=>{
    const prisma = getPrismaClient(c.env.DATABASE_URL);

    try{
        const blog = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        });

        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error loading blogs"
        })
    }
})

blogRouter.get("/:id",async (c)=>{
    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const id = c.req.param("id");

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                "id": true,
                "title": true,
                "content": true,
                "author":{
                    select:{
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error loading blog"
        })
    }
})