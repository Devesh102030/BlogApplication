import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { Appbar } from "../componenets/Appbar";
import { FullBlog } from "../componenets/FullBlog";
import { SingleBlogSkeleton } from "../componenets/SingleBlogSkeleton";

export const Blog = ()=>{
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if(loading || !blog){
        return(
            <div>
                <Appbar/>
                <div className="flex justify-center">
                    <div>
                        <SingleBlogSkeleton/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <FullBlog blog={blog}/> 
        </div>
    )
}