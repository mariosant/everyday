import fetch from 'isomorphic-unfetch'
import prop from 'ramda/src/prop'

const token = process.env.TOKEN
const feedCategory = process.env.CATEGORY_ID
const endpoint = 'https://cloud.feedly.com/v3/streams/contents'

const getFeed = () =>
  fetch(`${endpoint}?streamId=${feedCategory}`, {
    headers: {
      authorization: `OAuth ${token}`
    }
  })
    .then(r => r.json())
    .then(prop('items'))

export default async (req, res) => {
  const feed = await getFeed()

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')

  res.json({ feed })
}
