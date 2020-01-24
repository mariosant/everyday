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
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import useSWR, { useSWRPages } from 'swr'
import fetch from 'isomorphic-unfetch'
import Entry from '../src/components/Entry'
import Loader from '../src/components/Loader'
import { Sidebar } from '../src/components/Sidebar'
import Viz from 'react-visibility-sensor'

const getFeed = async from => {
  const encodedFrom = Buffer.from(from).toString('base64')
  const response = await fetch(`/api/feed/${encodedFrom}`).then(r => r.json())

  return response.feed
}

const getSources = async () => {
  const response = await fetch(`/api/sources`).then(r => r.json())

  return response
}

const ListLoader = () => times(index => <Loader key={index} />, 10)
const Items = ({ feed }) =>
  feed.map(entry => <Entry entry={entry} key={entry.id} />)

const Page = () => {
  const { data: sources } = useSWR('a', getSources)

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
    <Box>
      <AppBar color="primary" position="sticky" style={{ zIndex: 99999 }}>
        <ToolBar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">BBQ Corner 🥩</Typography>
        </ToolBar>
      </AppBar>
      <Sidebar sources={propOr([], 'sources', sources)} />

      <Box ml="350px" mt="0.6rem" px="0.6rem">
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
      </Box>
    </Box>
  )
}

export default Page
