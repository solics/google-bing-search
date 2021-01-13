import React from 'react';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inpQuery : '',
      selectedSearchEngine: 'all',
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchEngine = this.handleSearchEngine.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  handleChangeQuery(e) {
    this.setState({inpQuery: e.target.value})
  }

  handleSearch() {
    const { inpQuery, selectedSearchEngine} = this.state;
    if(inpQuery)
      this.props.search(inpQuery, selectedSearchEngine)
  }

  handleSearchEngine(e) {
    this.setState({selectedSearchEngine: e.target.value})
  }
  render() {
    const { inpQuery, selectedSearchEngine} = this.state;
    return (
      <div className='search-form'>
        <div className='search-form__inputs'>
          <input
            onChange={this.handleChangeQuery}
            value={inpQuery}
            type='text'
          />
          <select
            defaultValue={selectedSearchEngine}
            onChange={this.handleSearchEngine}
          >
            <option value='all'>All</option>
            <option value='google'>Google</option>
            <option value='bing'>Bing</option>
          </select>
        </div>
        <div className='search-form__action'>
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    )
  }
}
export default SearchForm