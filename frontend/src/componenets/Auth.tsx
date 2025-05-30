import { useState, type ChangeEvent } from "react"
import type { SignUpObject } from "@deveshparyani/medium-common"
import { Link } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Auth = ({type} : {type: "signup" | "signin"})=>{

    const [loading,setloading] = useState(false);

    const [postInputs, setpostInputs] = useState<SignUpObject>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    async function sendRequest(){
        setloading(true);
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e){
            console.log(e);
            alert("Error while signing up")
        }
        finally{
            setloading(false);
        }
    }

    return(
        <div className="flex justify-center flex-col h-screen">
            <div className="flex justify-center">
                <div className=" flex justify-center flex-col">
                    <h1 className="text-center text-4xl font-bold">
                        {type === "signup" ? "Create account" : "Login to your account"}
                    </h1>
                    <div className="mt-2 text-center text-slate-600">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline ml-1" to={type==="signup" ? "/signin" : "/signup"}>
                            {type === "signup" ? "Login" : "Sign Up"}
                        </Link>
                    </div>
                    
                    {type === "signup" ?
                        <LabelledInput label="Name" placeholder="Enter you name" onChange={(e)=>{
                            setpostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }}>
                        </LabelledInput> : null}
                    
                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabelledInput>

                    <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>

                    <div className="bg-gray-950 mt-6 rounded-md  flex justify-center flex-col">
                        <button onClick={sendRequest} className="h-12 text-white font-semibold">  
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    Loading...
                                </div>
                            ) : (
                                type === "signup" ? "Sign Up" : "Login"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
    )
}


interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return(
        <div className="flex justify-center flex-col">
            <div className="mb-2 mt-2 font-medium text-lg">{label}</div>
            <input className="border border-slate-400 w-100 h-10 rounded-md indent-3" type={type || "text"} placeholder={placeholder}
            onChange={onChange}/>
        </div>
    )
}

