import fetch from 'isomorphic-unfetch'
import { find, pipe, prop, propEq, sortBy } from 'ramda'

const token = process.env.TOKEN
const feedCategory = process.env.CATEGORY_ID
const endpoint = 'https://cloud.feedly.com/v3'

const getFeeds = pipe(
  find(propEq('id', feedCategory)),
  prop('feeds'),
  sortBy(prop('title'))
)

const getSources = () =>
  fetch(`${endpoint}/collections`, {
    headers: {
      authorization: `OAuth ${token}`
    }
  })
    .then(r => r.json())
    .then(getFeeds)

export default async (req, res) => {
  const sources = await getSources()

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')

  res.json({ sources })
}
