import fetch from 'isomorphic-unfetch'
import prop from 'ramda/src/prop'
import fakeData from './fakeData';

const token = process.env.TOKEN
const feedCategory = process.env.CATEGORY_ID
const endpoint = 'https://cloud.feedly.com/v3/streams/contents'

const getFeed = () => process.env.NODE_ENV === 'production'
  ? fetch(`${endpoint}?streamId=${feedCategory}`, {
    headers: {
      authorization: `OAuth ${token}`
    }
  })
    .then(r => r.json())
    .then(prop('items'))
  : fakeData;

export default async (req, res) => {
  const feed = await getFeed()

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')

  res.json({ feed })
}
