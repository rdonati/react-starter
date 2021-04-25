import { SvgIconProps } from '@material-ui/core/SvgIcon'

// ICONS
import HomeIcon from '@material-ui/icons/Home'

interface Route {
  path: string
  name: string
  icon?: React.ReactElement<SvgIconProps>
}

type RouteSection = {
  name: string
  routes: Route[]
  hasIcons: boolean
}

const ROUTES: RouteSection[] = [
  {
    name: 'Navigation',
    routes: [{ path: '/', name: 'Home', icon: <HomeIcon /> }],
    hasIcons: true,
  },
  {
    name: 'Auth',
    routes: [
      { path: '/login', name: 'Login' },
      { path: '/register', name: 'Register' },
    ],
    hasIcons: false,
  },
]

export default ROUTES
