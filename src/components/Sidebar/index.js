import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import {useStoreActions, useStoreState} from 'easy-peasy'

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: 0,
    width: '350px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '70px'
  },
  listMobile: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: 0,
    width: '90vw',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '70px'   
  },
  listItemText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}))

export const Source = ({ iconUrl, title }) => {
  const styles = useStyles()

  return (
    <ListItem button divider>
      <ListItemIcon>
        <img src={iconUrl} style={{ height: '32px', width: '32px' }} />
      </ListItemIcon>
      <ListItemText className={styles.listItemText}>{title}</ListItemText>
    </ListItem>
  )
}

export const Sidebar = ({ children, pending, sources = [] }) => {
  const styles = useStyles()
  const {closeSidebar} = useStoreActions(({sidebar}) => ({closeSidebar: sidebar.close}))
  const {sidebarVisible} = useStoreState(({sidebar}) => ({
      sidebarVisible: sidebar.visible
  }))

  return (
    <>
    <Hidden only="xs">
      <Drawer variant="permanent">
        <List className={styles.list}>
          <ListSubheader divider>Sources</ListSubheader>
          {sources.map(({ id: key, iconUrl, title }) =>
            React.createElement(Source, { key, iconUrl, title })
          )}
        </List>
      </Drawer>
    </Hidden>
    <Hidden smUp>
      <Drawer variant="temporary" open={sidebarVisible} onClose={closeSidebar}>
        <List className={styles.listMobile}>
          <ListSubheader divider>Sources</ListSubheader>
          {sources.map(({ id: key, iconUrl, title }) =>
            React.createElement(Source, { key, iconUrl, title })
          )}
        </List>
      </Drawer>
    </Hidden>
    </>
  )
}
