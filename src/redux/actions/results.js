import {
  SEARCH_GOOGLE_START,
  SEARCH_GOOGLE_SUCCESS,
  SEARCH_GOOGLE_FAIL,
  SEARCH_GOOGLE_FINISH,
  SEARCH_BING_START,
  SEARCH_BING_SUCCESS,
  SEARCH_BING_FAIL,
  SEARCH_BING_FINISH,
  SET_SEARCH_ENGINE
} from "../types/results";
import { sendQuery } from '../../utils/http';

export const search = (query, searchEngine) => async (dispatch) =>{
  console.log(query, searchEngine)
  dispatch({type: SET_SEARCH_ENGINE, payload: searchEngine})

  if(searchEngine == 'google' || searchEngine == 'bing') {
    dispatch({type: searchEngine == 'google' ? SEARCH_GOOGLE_START : SEARCH_BING_START});
    try {
      const items = await sendQuery(searchEngine, query);
      dispatch({type: searchEngine == 'google' ? SEARCH_GOOGLE_SUCCESS : SEARCH_BING_SUCCESS, payload: items});
    } catch (error) {
      dispatch({type: searchEngine == 'google' ? SEARCH_GOOGLE_FAIL : SEARCH_BING_FAIL});
    } finally {
      dispatch({type: searchEngine == 'google' ? SEARCH_GOOGLE_FINISH : SEARCH_BING_FINISH});
    }
  }
  else {//if it's both
    dispatch({type: SEARCH_GOOGLE_START});
    dispatch({type: SEARCH_BING_START});

    try {
      const items = await sendQuery('google', query);
      console.log("items", items)
      dispatch({type: SEARCH_GOOGLE_SUCCESS, payload: items});
    } catch (error) {
      console.log("ERROR", error)
      dispatch({type: SEARCH_GOOGLE_FAIL});
    } finally {
      dispatch({type: SEARCH_GOOGLE_FINISH});
    }

    try {
      const items = await sendQuery('bing', query);
      dispatch({type: SEARCH_BING_SUCCESS, payload: items});
      console.log("items", items)
    } catch (error) {
      console.log("ERROR", error)
      dispatch({type: SEARCH_BING_FAIL});
    } finally {
      dispatch({type: SEARCH_BING_FINISH});
    }
  }
}