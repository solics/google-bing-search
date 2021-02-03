import React from 'react'
import SearchResultItem from '../SearchResultItem'

export default function SearchResults (props) {
  const { response, loading, error } = props.data
  const hasResults = !loading && !error && response.length > 0
  const emptyResults = !loading && !error && !response.length

  return (
    <div className='search-results'>
      <h3 className='search-results__title'>{props.searchEngine} Results</h3>
      <div className='search-results__content'>
        {
          loading &&
            <div>Loading...</div>
        }
        {
          hasResults &&
          response.map(item => <SearchResultItem key={item.id} item={item} />)
        }
        {
          emptyResults &&
            <div>There's no results.</div>
        }
        {
          error &&
            <div>An error have ocurred.</div>
        }
      </div>
    </div>
  )
}
