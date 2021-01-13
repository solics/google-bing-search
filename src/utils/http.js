import { URL_GOOGLE_SEARCH, URL_BING_SEARCH} from './urls';
import { bing_key } from '../utils/keys';

export const sendQuery = async (searchEngine, query) => {
  return new Promise (async (resolve, reject) => {
    if(searchEngine == 'google') {
      try {
        const response = await fetch(`${URL_GOOGLE_SEARCH}${query}`);
        const data = await response.json();
        const items = data.items.map(item => ({
          snippet:item.snippet,
          title: item.title,
          displayLink: item.displayLink,
          link: item.link,
          id: item.cacheId,
        }));
        resolve(items);
      }
      catch (error) {
        reject(error)
      }
    }
    else if(searchEngine == 'bing') {
      try {
        const response = await fetch(`${URL_BING_SEARCH}${query}`, {
          'method': 'GET',
          'headers': {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': bing_key
          }});
        const data = await response.json();
        const items = data.webPages.value.map(item => ({
          snippet:item.snippet,
          title: item.name,
          displayLink: item.displayUrl,
          link: item.url,
          id: item.id,
        }));
        resolve(items)
      }
      catch (error) {
        reject(error)
      }
    }
  })
}