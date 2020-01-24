import fetch from 'isomorphic-unfetch'
import {pipe, find, propEq, prop} from 'ramda'
import url from 'url'

const token = process.env.TOKEN
const feedCategory = process.env.CATEGORY_ID
const endpoint = 'https://cloud.feedly.com/v3'

const getFeeds = pipe(find(propEq('id', feedCategory)), prop('feeds'));

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
