import React from 'react';

class SearchResultItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className='search-results__item'>
        <a target='_blank' href={item.link}>
          <span className='display-link'>{item.displayLink}</span>
          <span className='title-link'>{item.title}</span>
          <p>{item.snippet}</p>
        </a>
      </div>
    )
  }
}

export default SearchResultItem;