import { Appbar } from "../componenets/Appbar"
import { Footer } from "../componenets/Footer"


export const Terms = ()=>{
    return(
        <>
        <div className="flex flex-col min-h-screen">
            <Appbar/>
            <main className="flex flex-col flex-grow m-5 space-y-10">
                <div id="about">
                    <div className="text-2xl font-bold">About</div>
                    <div>
                        <p> Born from a late-night snack, two energy drinks, and a mysterious bug that still haunts us, this blog app exists because someone said, "Why not?" It’s a chaotic blend of ambition, copy-pasted Stack Overflow answers, and divine coding intervention. We’re not sure if it’s a blog platform or a sentient digital gremlin — but hey, it works (mostly). Welcome to our beautiful mess.  </p>
                    </div>
                </div>

                <div id="terms">
                    <div className="text-2xl font-bold">Terms & Conditions</div>
                    <div>
                        <ol className="list-decimal ml-5">
                            <li>You own your content, we just show it off (with your permission).</li>
                            <li>No evil allowed no hate, spam, or copyright theft.</li>
                            <li>Don’t sue us if your blog doesn’t go viral.</li>
                            <li>Use responsibly, or we may ghost you (ban your account).</li>
                        </ol>
                        <p>Happy blogging! </p>
                    </div>
                </div>

                <div id="help">
                    <div className="text-2xl font-bold">Help</div>
                    <div>
                        <p> You're on your own, brave explorer. No lifeboats, no helplines — just vibes. </p>
                    </div>
                </div>

                <div id="rules">
                    <div className="text-2xl font-bold">Rules</div>
                    <div>
                        <p> There are no rules. Just like a pirate ship, but with more blogging and fewer parrots. Write freely, but don’t summon chaos — or do, just don’t blame us.  </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
        </>
    )
}