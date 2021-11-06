import URLParse from 'url-parse'

/**
 * resolve url query params, include hash string
 *
 * @param url be resolved url string
 */
export function resolveQuery(url = location.href) {
  const fullURLParser =  new URLParse(url, true)
  const { hash, query } = fullURLParser

  const hashResult = new URLParse(hash.slice(1), true)
  // 以 query 为主
  return {
    ...hashResult.query,
    ...query
  }
}
