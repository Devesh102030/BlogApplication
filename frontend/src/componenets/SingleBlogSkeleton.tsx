export const SingleBlogSkeleton = ()=>{
    return(
        <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-5 w-full ot-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold">
                            <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                        </div>
                        <div className="text-slate-500 pt-2">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="pt-4">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                    <div className="col-span-4 pl-40">
                        <div className="text-slate-600 text-lg">
                           <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                           <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                           <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}