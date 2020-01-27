import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { useStoreActions } from 'easy-peasy'

const AppBarComponent = ({ onMenuClick }) => {
  return (
    <AppBar color="primary" position="sticky" style={{ zIndex: 99999 }}>
      <ToolBar>
        <Hidden smUp>
          <IconButton
            onClick={onMenuClick}
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
  )
}

const ApplicationBar = () => {
  const { toggleSidebar } = useStoreActions(({ sidebar }) => ({
    toggleSidebar: sidebar.toggle
  }))

  return <AppBarComponent onMenuClick={toggleSidebar} />
}

export default ApplicationBar
