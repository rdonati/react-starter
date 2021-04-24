import React, { useEffect } from 'react'
import ToastContext from './ToastContext'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export interface SnackbarMessage {
  message: string
  key: number
}

export interface State {
  open: boolean
  snackPack: SnackbarMessage[]
  messageInfo?: SnackbarMessage
}

export default function ToastProvider({ children }) {
  const [snackPack, setSnackPack] = React.useState<SnackbarMessage[]>([])
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined)

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const toast = (message: string) => {
    console.log('toasting')
    setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
  }

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return (
    <ToastContext.Provider value={toast}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <IconButton aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      {children}
    </ToastContext.Provider>
  )
}
