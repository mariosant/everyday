import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { DateTime } from 'luxon'
import propEq from 'ramda/src/propEq'
import React from 'react'

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
  const published = DateTime.fromMillis(entry.published)

  return (
    <ListItem
      divider
      component={props => <a href={href} target='_blank' {...props} />}
      alignItems='flex-start'
      button
    >
      <ListItemAvatar>
        <Avatar
          aria-label='recipe'
          style={{ backgroundColor: stringHexNumber(entry.author) }}
        >
          {entry.author[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={entry.title}
        secondary={`${entry.author} - ${published.toLocaleString(
          DateTime.DATE_MED
        )}`}
      />
    </ListItem>
  )
}

export default EntryCard
