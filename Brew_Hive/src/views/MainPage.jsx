import { useEffect, useState,useRef } from "react";
import isEqual from 'lodash/isEqual';

import {
  Box,
  Container,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  TextField,
  Fade,
  Modal,
  Skeleton,
  Paper,
  Checkbox,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import addPost from "../api/posts/addPost";
import getUserPosts from "../api/posts/getUserPosts";
import likePost from "../api/posts/likePost";
import getUserLikes from "../api/posts/getUserLikes";
import addComment from "../api/posts/addComment";
import fetchCommentsForPost from "../api/posts/getAllComments";
import editPost from "../api/posts/editPost";
import editComment from "../api/posts/editComment";
import deleteComment from "../api/posts/deleteComment";
import deletePost from "../api/posts/deletePost";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function MainPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenComment = () => setOpenComment(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditedPostBody(""); // Reset the edited content
  };
  const handleCloseComment = () => {
    setOpenComment(false);
    setEditedCommentBody(""); // Reset the edited content
  };
  const [expanded, setExpanded] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [editedPostBody, setEditedPostBody] = useState("");
  const [editedCommentBody, setEditedCommentBody] = useState("");
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentID, setCommentID] = useState();


  const handleExpandPost = async (postId) => {
    if (expanded === postId) {
      setComments([]); // Clear comments when collapsing the post
    } else {
      const fetchedComments = await fetchCommentsForPost(postId);
      setComments(fetchedComments);
    }
    setExpanded(expanded === postId ? null : postId); // Toggle expanded state
  };
  const handleChange = (userID) => (event, newExpanded) => {
    setExpanded(newExpanded ? userID : false);
  };

  const fetchComments = async (postId) => {
    const fetchedComments = await fetchCommentsForPost(postId);
    setComments(fetchedComments);
  };

  const userInfo = sessionStorage.getItem("User_Info");
  const storedObject = JSON.parse(userInfo);
  const username = storedObject.username;
  const user_id = storedObject.id;
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false), setOpen(false);
    setPostBody("");
    addPost(user_id, postBody);
    location.reload();
  };
  const handleCancelModal = () => {
    setOpenModal(false), setOpen(false);
    setPostBody("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "primary.main",
    boxShadow: 24,
    p: 2.5,
    borderRadius: "4px",
  };
  const HandleClick = async (e) => {
    try {
      await likePost(e.target.value, user_id);
      const userlikes = await getUserLikes(user_id);
      setLikes(userlikes);
      const res = await getUserPosts(user_id);
      setUsers(res);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  
  
  const handleMenuEdit = (event, postId,initialContent) => {
    setEditedPostBody(initialContent);
    handleOpenEdit();
  };

  const handleCommentEdit = (event, commentID,initialContent) => {
    setCommentID(commentID);
    setEditedCommentBody(initialContent);
    handleOpenComment();
  };
  const handleSaveEdit =  (postId) => {
     editPost(postId,editedPostBody);
    handleCloseEdit();
    window.location.reload();
  };

  const handleSaveComment = async () => {
    try {
      await editComment(commentID, editedCommentBody);
      handleCloseComment();
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error editing the comment:", error);
    }
  };

  const handleMenuDelete = (postId) => {
    deletePost(postId);
    console.log(postId);
    location.reload();
  };

  const handleCommentDelete = (postId) => {
    deleteComment(postId);
    // location.reload();
  };

  const commentOnPost =async  (postId) => {
    await addComment(postId, user_id,comment);
    setComment("");
    await fetchComments(postId);
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userlikes = await getUserLikes(user_id);
        setLikes(userlikes);
        const res = await getUserPosts(user_id);
        setUsers(res);
      } catch (error) {
        console.error({ error });
      }
    };
    fetchData();
  }, []);


  const actions = [
    { icon: <PostAddIcon />, name: "post" },
    { icon: <AddPhotoAlternateIcon />, name: "photo" },
  ];
 
  return (
    <>
      <Container
        maxWidth={"true"}
        sx={{
          padding: "75px 0px 25px 0px",
          bgcolor: "secondary.main",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
        }}

      >
        <Box
          display="grid"
          gap="20px"
          justifyContent="center"
          minHeight="100%"
          maxWidth="md"
          p={1}
        >
          {users.length === 0 ? (
            <Box
              display="grid"
              gap="20px"
              justifyContent="center"
              minHeight="100vh"
            >
              <Skeleton
                variant="rectangular"
                width="20em"
                height="200px"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width="20em"
                height="200px"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width="20em"
                height="200px"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width="20em"
                height="200px"
                animation="wave"
              />
            </Box>
          ) : (
            users.map((user) => (
              <Accordion
                expanded={expanded === user.id}
                disableGutters
                sx={{ borderRadius: "5px",height:"min-content"}}
                key={user.id}
                onChange={handleChange(user.id)}
                
              >
                <Card position="relative">
                  <CardHeader
                    avatar={
                      <Avatar
                        src={user.image}
                        sx={{
                          bgcolor: "white",
                          border: "1px solid",
                          borderColor: "secondary.main",
                        }}
                      />
                    }
                    title={user.username}
                    subheader={user.timeago}
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      ".MuiCardHeader-title": { color: "secondary.main" },
                      ".MuiCardHeader-subheader": { color: "secondary.main" },
                    }}
                    action={
                      <Box component="div" display={"flex"}>
                        <Button
                          value={user.id}
                          color="secondary"
                          size="small"
                          onClick={(event) => handleMenuEdit(event, user.id,user.content)}
                          
                        >
                          <EditIcon color="secondary" />
                        </Button>
                        
                          <Modal
                            open={openEdit}
                            onClose={handleCloseEdit}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <TextField
                                margin="normal"
                                size="small"
                                value={editedPostBody}
      onChange={(event) => setEditedPostBody(event.target.value)}
                                required
                                variant="outlined"
                                multiline
                                color="secondary"
                                fullWidth
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "secondary.main",
                                  },
                                  "& fieldset": {
                                    borderColor: "secondary.main",
                                  },
                                }}
                              ></TextField>
                            <Button color="secondary" onClick={() => handleSaveEdit(user.id)}>Save</Button>
                            </Box>
                          </Modal>
                        <Button
                          value={user.id}
                          color="secondary"
                          size="small"
                          onClick={() => handleMenuDelete(user.id)}
                          
                        >
                          <DeleteIcon color="error" />
                        </Button>
                      </Box>
                    }
                  />
                  <CardContent>
                    <Typography  variant="body1" color="text.primary">
                      {user.content}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      bgcolor: "primary.main",
                      padding: "15px",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0px" }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={<AddCommentIcon />}
                        color="secondary"
                        id={user.id}
                        onClick={() => handleExpandPost(user.id)}
                      >
                        Comments
                      </Button>
                    </AccordionSummary>
                    <Badge
                      badgeContent={user.like_count}
                      overlap="circular"
                      color="secondary"
                    >
                   
                      <Checkbox
                        icon={<ThumbUpOffAltIcon color="secondary" />}
                        checkedIcon={<ThumbUpAltIcon />}
                        color="secondary"
                        onClick={HandleClick}
                        value={user.id}
                        checked={likes.includes(user.id)}
                      />
                    </Badge>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<ShareIcon />}
                      color="secondary"
                    >
                      Share
                    </Button>
                  </CardActions>
                </Card>
                <AccordionDetails
                  sx={{
                    bgcolor: "secondary.second",
                    position: "relative",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <Paper elevation={2}>
                    <Box
                      display="flex"
                      justifyContent="space-evenly"
                      gap="20px"
                      p={1}
                      bgcolor="primary.main"
                      sx={{ marginBottom: "10px", borderRadius: "4px" }}
                      
                    >
                      <TextField
                        margin="normal"
                        size="small"
                        placeholder={`comment as ${username}...`}
                        required
                        variant="outlined"
                        multiline
                        color="secondary"
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                          "& .MuiInputBase-root": {
                            color: "secondary.main",
                          },
                          "& fieldset": { borderColor: "secondary.main" },
                        }}
                      ></TextField>
                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        value={user.id}
                        sx={{ alignSelf: "center", position: "relative" }}
                        onClick={() => commentOnPost(user.id)}
                      >
                        Post Comment
                      </Button>
                    </Box>
                  </Paper>
                  {comments.map((comment) => (
                    <Card key={comment.id} sx={{ marginBottom: "10px"}}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={user.image}
                          sx={{
                            bgcolor: "white",
                            border: "1px solid",
                            borderColor: "secondary.main",
                          }}
                        />
                      }
                      title={user.username}
                      subheader={comment.timeago}
                      sx={{
                        bgcolor: "primary.main",
                        width: "100%",
                        ".MuiCardHeader-title": { color: "secondary.main" },
                      ".MuiCardHeader-subheader": { color: "secondary.main" },
                      }}
                      action={
                      <Box component="div" display={"flex"}>
                        <Button
                          value={comment.id}
                          color="secondary"
                          size="small"
                          onClick={(event) => handleCommentEdit(event, comment.id,comment.content)}
                          
                        >
                          <EditIcon color="secondary" />
                        </Button>
                        
                          <Modal
                            open={openComment}
                            onClose={handleCloseComment}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <TextField
                                margin="normal"
                                size="small"
                                value={editedCommentBody}
      onChange={(event) => setEditedCommentBody(event.target.value)}
                                required
                                variant="outlined"
                                multiline
                                color="secondary"
                                fullWidth
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "secondary.main",
                                  },
                                  "& fieldset": {
                                    borderColor: "secondary.main",
                                  },
                                }}
                              ></TextField>
                            <Button color="secondary" onClick={() => handleSaveComment(comment.id)}>Save</Button>
                            </Box>
                          </Modal>
                        <Button
                          value={user.id}
                          color="secondary"
                          size="small"
                          onClick={() => handleCommentDelete(comment.id)}
                          
                        >
                          <DeleteIcon color="error" />
                        </Button>
                      </Box>
                    }
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.primary">
                        {comment.content}
                      </Typography>
                    </CardContent>
                  </Card>
                  ))}
                  
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Container>
      <Backdrop open={open} />
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "sticky",
          bottom: "0px",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            ".MuiSpeedDialIcon-icon": { color: "secondary.main" },
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) =>
            action.name === "post" ? (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={handleOpenModal}
                onClose={handleCloseModal}
                sx={{
                  ".MuiSpeedDialAction-staticTooltipLabel": {
                    bgcolor: "primary.main",
                    color: "secondary.main",
                  },
                  ".MuiFab-circular": { bgcolor: "secondary.main" },
                  ".MuiSvgIcon-fontSizeMedium": { color: "primary.main" },
                }}
              />
            ) : (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={handleClose}
                sx={{
                  ".MuiSpeedDialAction-staticTooltipLabel": {
                    bgcolor: "primary.main",
                    color: "secondary.main",
                  },
                  ".MuiFab-circular": { bgcolor: "secondary.main" },
                  ".MuiSvgIcon-fontSizeMedium": { color: "primary.main" },
                }}
              />
            )
          )}
        </SpeedDial>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={style}>
              <TextField
                id="outlined-multiline-static"
                multiline
                placeholder="Write post here..."
                sx={{
                  width: "100%",
                  height: "300px",
                  overflow: "auto",
                  bgcolor: "secondary.main",
                  marginBottom: "20px",
                  borderRadius: "4px",
                  scrollbarWidth: "10px",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                onChange={(e) => {
                  setPostBody(e.target.value);
                }}
                value={postBody}
              />
              <Box display="flex" gap="50px" justifyContent="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<SendIcon />}
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Post
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<CancelIcon />}
                  color="error"
                  onClick={handleCancelModal}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default MainPage;
