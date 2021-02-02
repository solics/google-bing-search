import React from 'react'

const SearchResultItem = ({ item }) => {
  return (
    <div className='search-results__item'>
      <a target='_blank' rel='noreferrer' href={item.link}>
        <span className='display-link'>{item.displayLink}</span>
        <span className='title-link'>{item.title}</span>
        <p>{item.snippet}</p>
      </a>
    </div>
  )
}
export default SearchResultItem
