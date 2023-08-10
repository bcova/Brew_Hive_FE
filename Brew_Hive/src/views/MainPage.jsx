import { useEffect, useState } from "react";
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
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import Comment from "../components/Comment";

function MainPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userID, setUserId] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (userID) => (event, newExpanded) => {
    setExpanded(newExpanded ? userID : false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false), setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "primary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
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
        }}
      >
        <Box
          display="grid"
          gap="30px"
          justifyContent="center"
          minHeight="100vh"
          maxWidth="md"
          p={2}
        >
          {users.length === 0 ? (
            <Box
              display="grid"
              gap="20px"
              justifyContent="center"
              minHeight="100vh"
              maxWidth="md"
            >
              <Skeleton variant="rectangular" width="20em" height="200px" />
              <Skeleton variant="rectangular" width="20em" height="200px" />
              <Skeleton variant="rectangular" width="20em" height="200px" />
              <Skeleton variant="rectangular" width="20em" height="200px" />
            </Box>
          ) : (
            users.map((user) => (
              <Accordion
                expanded={expanded === user.id}
                disableGutters
                sx={{ borderRadius: "5px" }}
                key={user.id}
                onChange={handleChange(user.id)}
              >
                <Card>
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
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      ".MuiCardHeader-title": { color: "secondary.main" },
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Nostrud quis minim veniam nisi ad et dolor reprehenderit
                      elit cillum. Deserunt commodo anim cupidatat anim officia
                      anim sunt magna laborum aute. Nostrud aliqua officia
                      aliqua cupidatat veniam et amet. In deserunt laboris ipsum
                      ipsum laboris excepteur sunt eiusmod pariatur. Voluptate
                      enim proident velit nostrud irure excepteur nostrud non
                      velit consequat aute quis magna. Consectetur laborum amet
                      veniam consectetur ullamco duis sunt. Deserunt eu mollit
                      minim et do nulla.
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
                        onClick={(e) => {
                          setUserId(e.target.id);
                        }}
                      >
                        Comment
                      </Button>
                    </AccordionSummary>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<ThumbUpOffAltIcon />}
                      color="secondary"
                    >
                      Like
                    </Button>

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
                  sx={{ bgcolor: "secondary.second", position: "relative" }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-evenly"
                    gap="20px"
                    p={1}
                    bgcolor="primary.main"
                    sx={{ marginBottom: "10px" }}
                  >
                    <TextField
                      margin="normal"
                      size="small"
                      placeholder="Comment here..."
                      required
                      variant="outlined"
                      multiline
                      color="secondary"
                      fullWidth
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
                      id={user.id}
                      onClick={(e) => {
                        setUserId(e.target.id);
                      }}
                      sx={{ alignSelf: "center", position: "relative" }}
                    >
                      Post Comment
                    </Button>
                  </Box>

                  <Comment user={user} />
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
          onClose={handleCloseModal}
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
                  bgcolor: "secondary.main",
                  marginBottom: "20px",
                }}
              />
              <Button
                size="small"
                variant="outlined"
                endIcon={<SendIcon />}
                color="secondary"
                onClick={handleCloseModal}
              >
                Post
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default MainPage;
