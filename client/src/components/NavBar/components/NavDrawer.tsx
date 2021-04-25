import React from 'react'
import { IconButton, SwipeableDrawer, List, Divider, ListItem, ListItemIcon, Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ROUTES from '../routes'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  const list = () => (
    <div className={classes.list} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {ROUTES.map(({ routes, hasIcons }, i) => {
        return (
          <>
            <List>
              {routes.map(({ name, path, icon }) => {
                return (
                  <ListItem component={RouterLink} key={path} to={path} className={classes.link} button>
                    {hasIcons && <ListItemIcon>{icon && icon}</ListItemIcon>}
                    <Typography>{name}</Typography>
                  </ListItem>
                )
              })}
            </List>
            {i !== ROUTES.length - 1 && <Divider />}
          </>
        )
      })}
    </div>
  )

  return (
    <>
      <IconButton color='inherit' onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor='left' open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </>
  )
}
