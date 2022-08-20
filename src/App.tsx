import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Share from './components/Share'
import { useUserContext } from './context'

const AuthRoute: React.FC<{ component: React.FC }> = ({ component: C }) => {
  const { userEmail } = useUserContext()
  return userEmail ? <C /> : <Navigate to='/' />
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/share' element={<AuthRoute component={Share} />} />
    </Routes>
  )
}

export default App
