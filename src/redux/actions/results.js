import * as TYPES from '../types/results'
import { sendQuery } from '../../utils/http'

export const search = (query, searchEngine) => async (dispatch) => {
  dispatch({ type: TYPES.SET_SEARCH_ENGINE, payload: searchEngine })

  const isGoogle = searchEngine === 'google'
  const allSearchEngines = searchEngine === 'all'

  if (allSearchEngines) {
    dispatch({ type: TYPES.SEARCH_GOOGLE_START })
    dispatch({ type: TYPES.SEARCH_BING_START })

    try {
      const items = await sendQuery('google', query)
      dispatch({ type: TYPES.SEARCH_GOOGLE_SUCCESS, payload: items })
    } catch (error) {
      dispatch({ type: TYPES.SEARCH_GOOGLE_FAIL })
    } finally {
      dispatch({ type: TYPES.SEARCH_GOOGLE_FINISH })
    }

    try {
      const items = await sendQuery('bing', query)
      dispatch({ type: TYPES.SEARCH_BING_SUCCESS, payload: items })
    } catch (error) {
      dispatch({ type: TYPES.SEARCH_BING_FAIL })
    } finally {
      dispatch({ type: TYPES.SEARCH_BING_FINISH })
    }
  } else {
    const engine = isGoogle ? 'GOOGLE' : 'BING'
    dispatch({ type: TYPES[`SEARCH_${engine}_START`] })
    try {
      const items = await sendQuery(searchEngine, query)
      dispatch({ type: TYPES[`SEARCH_${engine}_SUCCESS`], payload: items })
    } catch (error) {
      dispatch({ type: TYPES[`SEARCH_${engine}_FAIL`] })
    } finally {
      dispatch({ type: TYPES[`SEARCH_${engine}_FINISH`] })
    }
  }
}

export const cleanResults = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAN_RESULTS })
}
