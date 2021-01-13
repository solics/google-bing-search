import React from 'react';
import SearchResultItem from '../SearchResultItem';

class SearchResults extends React.Component {
  render() {
    const {
      data: {
        response,
        loading,
        error
      }
    } = this.props;
    
    return (
      <div className='search-results'>
        <h3 className='search-results__title'>{this.props.searchEngine} Results</h3>
        { loading &&
          <div>Loading...</div>
        }
        { !loading && !error && response.length > 0 &&
          response.map(item => <SearchResultItem  key={item.cacheId} item={item}/>)  
        }
        { !loading && !error && response.length == 0 &&
          <div>There's no results.</div>
        }
        { error && 
          <div>An error have ocurred.</div>
        }
      </div>
    )
  }
}

export default SearchResults;