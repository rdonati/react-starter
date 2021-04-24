import { Typography, Box, Button } from '@material-ui/core'
import useToast from '../../hooks/useToast'

export default function HomePage() {
  const toast = useToast()

  return (
    <Box m={3}>
      <Typography variant='h2' align='center'>
        Home!
      </Typography>
      <Button variant='contained' color='primary' onClick={() => toast('Hello there')}>
        Test
      </Button>
    </Box>
  )
}
