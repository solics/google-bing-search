import React from 'react'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'
import '../../styles/styles.scss'

import { useSelector } from 'react-redux'

const App = () => {
  const bingData = useSelector((state) => state.results.resultsBing)
  const googleData = useSelector((state) => state.results.resultsGoogle)
  const searchEngine = useSelector((state) => state.results.searchEngine)

  return (
    <div>
      <SearchForm />
      {
        searchEngine &&
        (searchEngine === 'google' || searchEngine === 'all') &&
          <SearchResults searchEngine='Google' data={googleData} />
      }
      {
        searchEngine &&
        (searchEngine === 'bing' || searchEngine === 'all') &&
          <SearchResults searchEngine='Bing' data={bingData} />
      }
    </div>
  )
}
export default App
