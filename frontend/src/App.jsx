import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import CreateBooks from "./pages/CreateBooks"
import EditBook from "./pages/EditBook"
import DeleteBook from "./pages/DeleteBook"
import ShowBook from "./pages/ShowBook"
import FileUpload from './pages/imageUpload.jsx'


const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="books/create" element={<CreateBooks/>}/>
    <Route path="books/edit/:id" element={<EditBook/>}/>
    <Route path="books/delete/" element={<DeleteBook/>}/>
    <Route path="books/details/:id" element={<ShowBook/>}/>
   </Routes>
  )
}

export default App