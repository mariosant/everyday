import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

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

  return (
    <Drawer variant="permanent">
      <List className={styles.list}>
        <ListSubheader divider>Sources</ListSubheader>
        {sources.map(({ id: key, iconUrl, title }) =>
          React.createElement(Source, { key, iconUrl, title })
        )}
      </List>
    </Drawer>
  )
}
