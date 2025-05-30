import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Terms } from "./pages/Terms"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs></Blogs>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}/>
          <Route path="/blog/:id" element={<Blog></Blog>}/>
          <Route path="/blogs" element={<Blogs></Blogs>}/>
          <Route path="/publish" element={<Publish></Publish>}></Route>
          <Route path="/useless" element={<Terms></Terms>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


