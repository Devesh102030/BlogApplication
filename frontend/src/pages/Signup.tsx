import { Quote } from "../componenets/Quote"
import { Auth } from "../componenets/Auth";


export const Signup = () => {

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <Auth type="signup"></Auth>
            <div className="invisible lg:visible">
                <Quote></Quote>
            </div>  
        </div>
    )
}

