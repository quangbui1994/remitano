import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from '../types'
import ItemsList from './ItemsList'
import { Container } from '@mui/material'

const Content = () => {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await axios.get(`${process.env.REACT_APP_API_GATEWAY}/links`)
      setLinks(JSON.parse(data.data.body).Items)
    }

    fetchLinks()
  }, [])

  return (
    <Container maxWidth='sm'>
      <ItemsList links={links} />
    </Container>
  )
}

export default Content
