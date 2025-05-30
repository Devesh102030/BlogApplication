import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-2xl">
                Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name="Devesh"/>
        </div>
    </div>
}


function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {

    const [showDropdown,setshowDropdox] = useState(false);
    const navigate = useNavigate();

    function toggle(){
        setshowDropdox(showDropdown => !showDropdown)
    }

    function logout(){
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return( 
        <div className="relative inline-block">
            <div onClick={toggle} className={`cursor-pointer relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
                <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-100`}>
                    {name[0]}
                </span>
            </div>

            {showDropdown && 
                <div className="absolute mt-2 right-0 bg-white border rounded shadow-md z-10">
                    <button
                        onClick={logout}
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            }
        </div>
    )
}



