import React from 'react'

type ToastContextType = (msg: string) => void

const ToastContext = React.createContext<ToastContextType>(() => null)

export default ToastContext
