import { useState, forwardRef } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

interface IProps {
  setSuccessOpen: (open: boolean) => void
  successOpen: boolean
  errOpen: boolean
  setErrOpen: (open: boolean) => void
  error: string
  successMesssage: string
}

const Popup: React.FC<IProps> = ({
  setSuccessOpen,
  setErrOpen,
  errOpen,
  successOpen,
  error,
  successMesssage,
}) => {
  return (
    <>
      <Snackbar open={errOpen} autoHideDuration={6000} onClose={() => setErrOpen(false)}>
        <Alert onClose={() => setErrOpen(false)} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        <Alert onClose={() => setSuccessOpen(false)} severity='success' sx={{ width: '100%' }}>
          {successMesssage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Popup
