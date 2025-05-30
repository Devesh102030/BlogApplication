import { useNavigate } from "react-router-dom"

export const Footer = ()=>{
    const navigate = useNavigate();
    return(
        <div>
            <footer>
                <div className="border-t"></div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center space-x-8 text-slate-800 py-5 cursor-pointer" onClick={()=>navigate('/useless')}>
                        <div>Help</div>
                        <div>About</div>
                        <div>Rules</div>
                        <div>Terms</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}