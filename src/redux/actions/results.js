import * as TYPES from '../types/results'
import { sendQuery } from '../../utils/http'

export const search = (query, searchEngine) => async (dispatch) => {
  dispatch({ type: TYPES.SET_SEARCH_ENGINE, payload: searchEngine })

  if (searchEngine === 'google' || searchEngine === 'bing') {
    dispatch({ type: searchEngine === 'google' ? TYPES.SEARCH_GOOGLE_START : TYPES.SEARCH_BING_START })
    try {
      const items = await sendQuery(searchEngine, query)
      dispatch({ type: searchEngine === 'google' ? TYPES.SEARCH_GOOGLE_SUCCESS : TYPES.SEARCH_BING_SUCCESS, payload: items })
    } catch (error) {
      dispatch({ type: searchEngine === 'google' ? TYPES.SEARCH_GOOGLE_FAIL : TYPES.SEARCH_BING_FAIL })
    } finally {
      dispatch({ type: searchEngine === 'google' ? TYPES.SEARCH_GOOGLE_FINISH : TYPES.SEARCH_BING_FINISH })
    }
  } else { // if it's both
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
  }
}

export const cleanResults = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAN_RESULTS })
}
