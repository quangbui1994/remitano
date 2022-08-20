import React from 'react'
import { Card, Box, CardContent, Typography, CardMedia } from '@mui/material'
import { Link } from '../types'

const Item: React.FC<{ link: Link }> = ({ link }) => {
  const click = () => {
    window.open(link.url)
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component='img'
        sx={{ width: 151, cursor: 'pointer' }}
        image={link.thumbnail_url}
        alt='Live from space album cover'
        onClick={click}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {link.title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            {link.author_name}
          </Typography>
          <Typography variant='body1' color='text.secondary' component='div'>
            Shared by {link.userEmail}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default Item
