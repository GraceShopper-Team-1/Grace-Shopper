import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Row({title, genre, isLargeRow}) {
  const navigate = useNavigate()
  return (
    <div className='row-container'>
    <h2 className='row-text-HomeScreen'>{title}</h2>
    <hr/><div className='rowBooks'>
   { isLargeRow ? 
        
        genre.map((book) => (
          <li  key={book.id}> 
       <img className='row-img-large' src={book.coverImageUrl} onClick={() => navigate(`/products/${book.id}`)}/>
          </li>
        ))
    :
    
    genre.map((book) => (
      <li  key={book.id}> 
      <img className='row-img' src={book.coverImageUrl} onClick={() => navigate(`/products/${book.id}`)}/>
      </li>
    ))}
    </div>
    </div>)
}

export default Row