import React from 'react'
import { useSelector } from 'react-redux'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'
import '../../styles/styles.scss'

const GOOGLE = 'google'
const BING = 'bing'
const ALL_ENGINES = 'all'

export default function App () {
  const {
    resultsBing: bingData,
    resultsGoogle: googleData,
    searchEngine
  } = useSelector((state) => state.results)

  const isGoogle = searchEngine === GOOGLE
  const isBing = searchEngine === BING
  const bothSearchEngines = searchEngine === ALL_ENGINES

  return (
    <div>
      <SearchForm />
      {
        searchEngine &&
        (isGoogle || bothSearchEngines) &&
          <SearchResults searchEngine='Google' data={googleData} />
      }
      {
        searchEngine &&
        (isBing || bothSearchEngines) &&
          <SearchResults searchEngine='Bing' data={bingData} />
      }
    </div>
  )
}
