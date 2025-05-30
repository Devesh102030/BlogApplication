import { BlogCard } from "../componenets/BlogCard"
import { Appbar } from "../componenets/Appbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../componenets/BlogSkeleton"
import type { Blog } from "../hooks"
import { useState } from "react"
import { Footer } from "../componenets/Footer"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Blogs = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
        navigate("/login"); // redirect to login page
        }
    }, [navigate]);
    

    const {loading, blogs} = useBlogs();

    if(loading){
        return(
            <div>
                <Appbar/>
                <div className="flex justify-center w-full">
                    <div>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                    </div>
                </div>
            </div>
        )
    }
    return(
        
        <div>
            <Appbar/>
            <LoadBlogs blogs={blogs}></LoadBlogs>
            <Footer/>
        </div>
        
    )
}


function LoadBlogs({blogs} : {blogs: Blog[]}){
    const [currentPage, setcurrentPage] = useState(1);
    const blogsPerPage = 10;

    const totalPages = Math.ceil(blogs.length/10);
    const lastIndex = currentPage*blogsPerPage;
    const startIndex = lastIndex - blogsPerPage;
    const currentBlogs = blogs.slice(startIndex,lastIndex);

    return(
        <>
            <div className="flex justify-center">
                    <div className="space-y-4 ">
                        {currentBlogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            content={blog.content}
                            authorName={blog.author.name || "Anonymous"}
                            publishedDate="30 May 2025"
                        />
                        ))}
                    </div>
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} onChange={({i}:{i:number})=>setcurrentPage(i+1)}/>
        </>
    )
}



function Pagination({
    totalPages, 
    currentPage,
    onChange
}: {
    totalPages: number,
    currentPage: number,
    onChange: ({ i }: { i: number }) => void;
}){
    return(
        <div className="flex justify-center mt-5 mb-5">
            <nav className="flex items-center gap-x-1" aria-label="Pagination">
                <button type="button" disabled={currentPage==1} className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous"
                onClick={()=>onChange({i: currentPage-2})}>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                    {Array.from({length: totalPages}, (_,i)=>(
                        <button key={i}
                        onClick={()=>{
                            onChange({i});
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`min-h-9.5 min-w-9.5 flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-200 py-2 px-3 text-sm rounded-lg focus:outline-hidden 
                        ${currentPage === i+1 ? "focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" : "focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"}`}
                        >
                            <span>{i+1}</span>
                        </button>
                    ))}
                </div>
                <button type="button" disabled={currentPage==totalPages} className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next"
                onClick={()=>onChange({i: currentPage})}>
                    <span className="sr-only">Next</span>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
            </nav>
        </div>
    )
}

