import React from 'react'
// import {horror, romance, fiction, astro, novels } from './booksByGenre'

function Row({title, genre, isLargeRow}) {
  return (
    <div className='row-container'>
    <h2 className='row-text-HomeScreen'>{title}</h2>
    <hr/><div className='rowBooks'>
   { isLargeRow ? 
        
        genre.map((book) => (
          <li  key={book.id}> 
          <img className='row-img-large' src={book.coverImageUrl}/>
          </li>
        ))
    :
    
    genre.map((book) => (
      <li  key={book.id}> 
      <img className='row-img' src={book.coverImageUrl}/>
      </li>
    ))}
    </div>
    </div>)
}

export default Row