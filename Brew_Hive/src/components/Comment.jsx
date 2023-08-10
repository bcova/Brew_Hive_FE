import React from 'react'
import {
    Box,
    Card,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    IconButton,
  } from "@mui/material";
  import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
  
const Comment = ({user}) => {
  
  return (
    <Card
    sx={{
      bgcolor: "primary.main",
      marginBottom: "15px",
    }}
  >
    <Box display="flex"  p={1} alignItems="center" gap={2}>
      <Avatar
        src={user.image}
        sx={{
          bgcolor: "white",border:'1px solid',borderColor:'primary.main'
        }}
      />
      <Typography color='secondary.main'>{user.username}</Typography>
    </Box>

    <CardContent>
      <Typography variant="body2" color="secondary.main">
        Nostrud quis minim veniam nisi ad et dolor reprehenderit
        elit cillum. Deserunt commodo anim cupidatat anim officia
        anim sunt magna laborum aute. Nostrud aliqua officia
        aliqua cupidatat veniam et amet. In deserunt laboris ipsum
      
      </Typography>
      <CardActions sx={{position:'relative',top:'10px'}}
  >
<IconButton
      color="secondary"
      endIcon={<ThumbUpOffAltIcon />}
    >
      <ThumbUpOffAltIcon />
    </IconButton>
  </CardActions>
    </CardContent>
  </Card>
  )
}

export default Comment