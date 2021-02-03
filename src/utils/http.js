import { URL_GOOGLE_SEARCH, URL_BING_SEARCH } from './urls'
import { bingKey } from '../utils/keys'

export const sendQuery = async (searchEngine, query) => {
  return new Promise((resolve, reject) => {
    if (searchEngine === 'google') {
      try {
        window.fetch(`${URL_GOOGLE_SEARCH}${query}`)
          .then(response => response.json())
          .then(data => {
            let items = []
            if (data.items) {
              items = data.items.map(item => ({
                snippet: item.snippet,
                title: item.title,
                displayLink: item.displayLink,
                link: item.link,
                id: item.cacheId || item.formattedUrl
              }))
            }
            resolve(items)
          })
          .catch(error => reject(error))
      } catch (error) {
        reject(error)
      }
    } else if (searchEngine === 'bing') {
      try {
        window.fetch(`${URL_BING_SEARCH}${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': bingKey
          }
        })
          .then(response => response.json())
          .then(data => {
            let items = []
            if (data.webPages) {
              items = data.webPages.value.map(item => ({
                snippet: item.snippet,
                title: item.name,
                displayLink: item.displayUrl,
                link: item.url,
                id: item.id
              }))
            }
            resolve(items)
          })
          .catch(error => reject(error))
      } catch (error) {
        reject(error)
      }
    }
  })
}
