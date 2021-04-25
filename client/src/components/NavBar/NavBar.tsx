import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, Box, useMediaQuery } from '@material-ui/core'
import NavDrawer from './components/NavDrawer'
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
  const { isLoggedIn, logout } = useAuth()
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {isLarge ? <div /> : <NavDrawer />}

          <Box className={classes.root}>
            {isLarge &&
              ROUTES.map(({ routes }) =>
                routes.map(({ name, path }, i) => {
                  return (
                    <Button component={RouterLink} key={i} to={path} color='inherit'>
                      {name}
                    </Button>
                  )
                })
              )}
          </Box>
          {isLoggedIn ? (
            <Button component={RouterLink} onClick={logout} to='/' color='inherit'>
              Logout
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to='/login' color='inherit'>
                Login
              </Button>
              <Button component={RouterLink} to='/register' color='inherit'>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
