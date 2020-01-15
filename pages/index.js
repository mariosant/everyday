import React from 'react'
import times from 'ramda/src/times'
import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import last from 'ramda/src/last'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import useSWR, { useSWRPages } from 'swr'
import fetch from 'isomorphic-unfetch'
import Entry from '../src/components/Entry'
import Loader from '../src/components/Loader'
import Viz from 'react-visibility-sensor'

const getFeed = async from => {
  const encodedFrom = Buffer.from(from).toString('base64')
  const response = await fetch(`/api/feed/${encodedFrom}`).then(r => r.json())

  return response.feed
}

const ListLoader = () => times(index => <Loader key={index} />, 10)
const Items = ({ feed }) =>
  feed.map(entry => <Entry entry={entry} key={entry.id} />)

const Page = () => {
  const { pages, loadMore, isLoadingMore, isReachingEnd } = useSWRPages(
    'feed',
    ({ offset, withSWR }) => {
      const { data = [] } = withSWR(useSWR(offset || 'initial', getFeed))

      return <Items feed={data} />
    },
    ({ data = [] }) => propOr(null, 'id', last(data)),
    []
  )

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={8}>
        <Box fontSize="h4.fontSize" pt="2rem" px="0.6rem">
          BBQ Corner 🥩
        </Box>

        <Box fontSize="h5.fontSize" py="0.6rem" px="0.6rem">
          Your source of curated barbecue news.
        </Box>

        <Paper>
          <List container bordered>
            {pages}
            {isLoadingMore && <ListLoader />}
          </List>

          <Box textAlign="center" padding="2rem">
            <Viz
              onChange={isVisible => isVisible && !isLoadingMore && loadMore()}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={loadMore}
                disabled={isReachingEnd || isLoadingMore}
              >
                Load more
              </Button>
            </Viz>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Page
