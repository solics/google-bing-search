import * as TYPES from '../types/results'

const initialState = {
  resultsGoogle: {
    response: [],
    loading: false,
    error: false
  },
  resultsBing: {
    response: [],
    loading: false,
    error: false
  },
  searchEngine: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_SEARCH_ENGINE:
      return {
        ...state,
        searchEngine: action.payload
      }
    case TYPES.SEARCH_GOOGLE_START:
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          loading: true,
          response: [],
          error: false
        },
        resultsBing: {
          ...state.resultsBing,
          response: [],
          error: false
        }
      }
    case TYPES.SEARCH_GOOGLE_SUCCESS:
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          response: action.payload
        }
      }
    case TYPES.SEARCH_GOOGLE_FAIL:
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          error: true
        }
      }

    case TYPES.SEARCH_GOOGLE_FINISH:
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          loading: false
        }
      }

    case TYPES.SEARCH_BING_START:
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          loading: true,
          response: [],
          error: false
        },
        resultsGoogle: {
          ...state.resultsGoogle,
          response: [],
          error: false
        }
      }
    case TYPES.SEARCH_BING_SUCCESS:
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          response: action.payload
        }
      }
    case TYPES.SEARCH_BING_FAIL:
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          error: true
        }
      }

    case TYPES.SEARCH_BING_FINISH:
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          loading: false
        }
      }
    case TYPES.CLEAN_RESULTS:
      return {
        ...initialState
      }
    default:
      return state
  }
}
