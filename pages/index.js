import React from 'react'
import times from 'ramda/src/times'
import prop from 'ramda/src/prop'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import Entry from '../src/components/Entry'
import Loader from '../src/components/Loader'

const ListLoader = () => times(index => <Loader key={index} />, 10)
const Items = ({ feed }) =>
  feed.map(entry => <Entry entry={entry} key={entry.id} />)

const Page = () => {
  const { data, error } = useSWR('/api/feed', api =>
    fetch(api).then(r => r.json())
  )

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={6}>
        <Box fontSize="h3.fontSize" pt="2rem">
          BBQ Corner 🥩
        </Box>

        <Box fontSize="h5.fontSize" py="0.6rem">
          Your source of curated barbecue news.
        </Box>

        <Paper>
          <List container>
            {prop('feed', data) ? <Items feed={data.feed} /> : <ListLoader />}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Page
