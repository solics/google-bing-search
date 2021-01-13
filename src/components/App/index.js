import React from 'react';
import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';
import '../../styles/styles.scss';

import { search } from '../../redux/actions/results';
import { connect } from 'react-redux';

class App extends React.Component{
  constructor() {
    super();
  }
  search(query, searchEngine) {
    this.props.search(query, searchEngine);
  }
  render () {
    const {
      searchEngine,
      googleData,
      bingData,
      search
    } = this.props;

    return (
      <div>
        <SearchForm search={search}/>
        {
          searchEngine && 
          (searchEngine=='google' || searchEngine=='all') &&
          <SearchResults searchEngine={'Google'} data={googleData}/>
        }
        {  
          searchEngine &&
          (searchEngine=='bing' || searchEngine=='all') &&
          <SearchResults searchEngine={'Bing'} data={bingData}/>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  console.log(state)
  return ({
    bingData: state.results.resultsBing,
    googleData: state.results.resultsGoogle,
    searchEngine: state.results.searchEngine,
  })
}
const mapDispatchToProps = dispatch => ({
  search: (query, searchEngine) => dispatch(search(query, searchEngine))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)