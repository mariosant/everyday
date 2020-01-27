import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import fetch from 'isomorphic-unfetch'
import last from 'ramda/src/last'
import propOr from 'ramda/src/propOr'
import times from 'ramda/src/times'
import React from 'react'
import Viz from 'react-visibility-sensor'
import useSWR, { useSWRPages } from 'swr'
import { useStoreActions } from 'easy-peasy'
import Entry from '../src/components/Entry'
import Loader from '../src/components/Loader'
import { Sidebar } from '../src/components/Sidebar'

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

const useStyles = makeStyles(theme => ({
  responsivePadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 'calc(350px + 0.6rem)'
    }
  }
}))

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

  const styles = useStyles()

  const { toggleSidebar } = useStoreActions(({ sidebar }) => ({
    toggleSidebar: sidebar.toggle
  }))

  return (
    <Box>
      <AppBar color="primary" position="sticky" style={{ zIndex: 99999 }}>
        <ToolBar>
          <Hidden smUp>
            <IconButton
              onClick={toggleSidebar}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h5">BBQ Corner 🥩</Typography>
        </ToolBar>
      </AppBar>

      <Sidebar sources={propOr([], 'sources', sources)} />

      <Box mt="0.6rem" px="0.6rem" className={styles.responsivePadding}>
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
