import React from 'react'
import SearchResultItem from '../SearchResultItem'

const SearchResults = (props) => {
  const { response, loading, error } = props.data
  return (
    <div className='search-results'>
      <h3 className='search-results__title'>{props.searchEngine} Results</h3>
      <div className='search-results__content'>
        {
          loading &&
            <div>Loading...</div>
        }
        {
          !loading && !error && response.length > 0 &&
          response.map(item => <SearchResultItem key={item.cacheId} item={item} />)
        }
        {
          !loading && !error && response.length === 0 &&
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
export default SearchResults
