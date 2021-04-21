type Route = {
  path: String
  name: String
}

const ROUTES: Route[] = [
  { path: '/', name: 'Home' },
  { path: '/login', name: 'Login' },
  { path: '/register', name: 'Register' },
]

export default ROUTES
