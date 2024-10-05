import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, json } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import DeleteBook from "../components/deleteCard"

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    useEffect(() => {
      fetchBooks();
    }, [])
    const fetchBooks = () =>{
        setLoading(true);
        axios.get('http://localhost:3001/books').then((res)=>{
            setBooks(res.data);
            setLoading(false);
          })
          .catch((error)=>{
            console.log(error);
            setLoading(false);})
    }
    const handleDelete=(id)=>{
        setDeleteId(id);
        setDeleteOpen(true);
    }

    return (

        <>
            {(deleteOpen)?<DeleteBook 
          setDeleteOpen={setDeleteOpen}
          deleteId={deleteId}
          onDeleteSuccess={fetchBooks}
          />
          :""}
            <div className='p-4'>
                <div className="flex justify-between align-center">
                    <h1 className='text-3xl my-4'>Books List</h1>
                    <Link to='/books/create'>
                        <MdOutlineAddBox className='my-4 h-10 w-10'/>
                    </Link>
                </div>
            </div>
            {loading
                ?
                (<Spinner/>
                )
                :
                (<table className='w-full border-separate border-spacing-2 text-xl'>
                <thead>
                    <tr>
                        <th className="border border-slate-600 rounded-md">No</th>
                        <th className="border border-slate-600 rounded-md">Book</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                        <th className="border border-slate-600 rounded-md">Opeartions</th>
                    </tr>
                </thead>
                    <tbody>
                        {books.map((book,index)=>(
                        
                            <tr key={book._id}>
                                <td className="border border-slate-600 rounded-md   text-center">{index}</td>
                                <td className="border border-slate-600 rounded-md   text-center">{book.title}</td>
                                <td className="border border-slate-600 rounded-md   max-md:hidden text-center">{book.author}</td>
                                <td className="border border-slate-600 rounded-md   max-md:hidden text-center">{book.publishYear}</td>
                                <td className="flex justify-between gap-x-4">
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className='text-2xl  text-green-800'/>
                                    </Link>
                                    <BsInfoCircle className='text-2xl   text-yellow-600'/>
                                        <MdOutlineDelete className='text-2xl    text-red-600' onClick={()=>handleDelete(book._id)}/> 
                                </td>
                            </tr>
                         ))} 

                    </tbody>
                </table>)

            }
            
        </>

    )
};

export default Home;