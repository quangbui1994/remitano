import { Box, Stack } from '@mui/material'
import React from 'react'
import { Link } from '../types'
import Item from './Item'

const ItemsList: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <Stack paddingTop={8} spacing={3}>
      {links?.map((link) => (
        <Item key={`${link.author_name}-${link.title}`} link={link} />
      ))}
    </Stack>
  )
}

export default ItemsList
