import fetch from 'isomorphic-unfetch'
import prop from 'ramda/src/prop'
import fakeData from './fakeData'
import url from 'url'

const token = process.env.TOKEN
const feedCategory = process.env.CATEGORY_ID
const endpoint = 'https://cloud.feedly.com/v3/streams/contents'

const getFeed = from =>
  process.env.NODE_ENV === 'production'
    ? fetch(`${endpoint}?streamId=${feedCategory}&continuation=${from}`, {
        headers: {
          authorization: `OAuth ${token}`
        }
      })
        .then(r => r.json())
        .then(prop('items'))
    : fakeData

export default async (req, res) => {
  const { query: {from} } = req; 
  const feed = await getFeed(Buffer.from(from, 'base64').toString())

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')

  res.json({ feed })
}
