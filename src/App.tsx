import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Share from './components/Share'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/share' element={<Share />} />
    </Routes>
  )
}

export default App
