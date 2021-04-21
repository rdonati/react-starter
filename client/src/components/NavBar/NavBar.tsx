import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link as RouterLink } from 'react-router-dom'
import ROUTES from './routes'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export default function NavBar() {
  const classes = useStyles()
  const { token, logout } = useAuth()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Box className={classes.root}>
            {ROUTES.map(({ path, name }, i) => (
              <Button component={RouterLink} key={i} to={path} color='inherit'>
                {name}
              </Button>
            ))}
          </Box>
          {token ? (
            <Button onClick={logout} color='inherit'>
              Logout
            </Button>
          ) : (
            <Button component={RouterLink} to='/login' color='inherit'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
