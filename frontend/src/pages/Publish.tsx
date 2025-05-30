import { Appbar } from "../componenets/Appbar"
import Editor from "../componenets/Editor"

export const Publish = ()=>{
    return(
        <>
            <Appbar/>
            <div className="flex justify-center">
                <Editor></Editor>
            </div>
        </>
    )
}