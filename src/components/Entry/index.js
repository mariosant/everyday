import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import propEq from 'ramda/src/propEq'
import React from 'react'
import TimeAgo from 'react-timeago'

const stringHexNumber = string =>
  (
    parseInt(
      parseInt(string, 36)
        .toExponential()
        .slice(2, -5),
      10
    ) & 0xffffff
  )
    .toString(16)
    .toUpperCase()

const EntryCard = ({ entry }) => {
  const href = entry.alternate.find(propEq('type', 'text/html')).href

  return (
    <ListItem
      divider
      component={props => <a href={href} target="_blank" {...props} />}
      alignItems="flex-start"
      button
    >
      <ListItemText
        primary={entry.title}
        secondary={
          <>
            <TimeAgo date={entry.published} /> - {entry.author}
          </>
        }
      />
    </ListItem>
  )
}

export default EntryCard
