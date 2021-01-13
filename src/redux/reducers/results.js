import {
  SEARCH_GOOGLE_START,
  SEARCH_GOOGLE_SUCCESS,
  SEARCH_GOOGLE_FAIL,
  SEARCH_GOOGLE_FINISH,
  SEARCH_BING_START,
  SEARCH_BING_SUCCESS,
  SEARCH_BING_FAIL,
  SEARCH_BING_FINISH,
  SET_SEARCH_ENGINE,
} from "../types/results";

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
  searchEngine: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_ENGINE:
      return {
        ...state,
        searchEngine: action.payload,
      }
    case SEARCH_GOOGLE_START: 
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          loading: true,
          response: [],
          error: false,
        },
        resultsBing: {
          ...state.resultsBing,
          response: [],
          error: false,
        }
      }
    case SEARCH_GOOGLE_SUCCESS: 
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          response: action.payload
        }
      }
    case SEARCH_GOOGLE_FAIL: 
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          error: true
        }
      }

    case SEARCH_GOOGLE_FINISH: 
      return {
        ...state,
        resultsGoogle: {
          ...state.resultsGoogle,
          loading: false
        }
      }
    
    case SEARCH_BING_START:
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          loading: true,
          response: [],
          error: false,
        },
        resultsGoogle: {
          ...state.resultsGoogle,
          response: [],
          error: false,
        },
      }
    case SEARCH_BING_SUCCESS: 
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          response : action.payload
        }
      }
    case SEARCH_BING_FAIL: 
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          error: true
        }
      }

    case SEARCH_BING_FINISH: 
      return {
        ...state,
        resultsBing: {
          ...state.resultsBing,
          loading: false
        }
      }
    default:
      return state;
  }
}