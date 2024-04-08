import { useState } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { shape, string } from "prop-types";
import { useNavigate } from "react-router-dom";
import DefaultBgImage from '~/assets/home1bg.jpg'
import DynamicModal from "~/components/Modal";
import ContentViewer from "./Viewers";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Favorite } from "@mui/icons-material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1
    },
    card: {
      margin: theme.spacing(2),
      minHeight: "93%"
    },
    cardTitle: {
      padding: 0,
      color: "#696969",
      textTransform: "uppercase"
    },
    cardBody: {
      color: "#999999",
      paddingTop: 0
    }
  };
});

function CardView({ data }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({ open: false });
  const [liked, setLiked] = useState(false);

  const handleModalClose = () => {
    setModalData({});
  };
  function handleCardAction() {
    if (data.content?.length > 0) {
      setModalData({ open: true, data });
    }
  }

  const handleLike = () => {
    setLiked(!liked);
  }

  // Conditional rendering of CardMedia based on the data type
  const renderCardMedia = () => {
    switch (data.type) {
      case "image":
        return (
          <CardMedia
            height={200}
            component="img"
            alt={data.title}
            image={data.content[0] || DefaultBgImage}
            title={data.title}
          />
        );
      case "video":
      case "youtube":
      case "audio":
        // For video, youtube, and audio, use a placeholder image or a specific thumbnail
        // and overlay a play icon to indicate action.
        return (
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={200}
          >
            <CardMedia
              component="img"
              alt={data.title}
              image={data.backgroundImg || DefaultBgImage}
              title={data.title}
              style={{ height: '100%', width: '100%', position: 'absolute' }}
            />
            <IconButton onClick={handleCardAction} sx={{ color: 'white', zIndex: 1}}>
              <PlayCircleOutlineIcon fontSize="large"/>
            </IconButton>
          </Box>

        );
      case "pdf":
        // For PDFs, might directly use an image if provided or a default one
        return (
          <CardMedia
            height={200}
            component="img"
            alt={data.title}
            image={data.backgroundImg || DefaultBgImage}
            title={data.title}
          />
        );
      default:
        // Fallback for other types or undefined type
        return (
          <CardMedia
            height={200}
            component="img"
            alt={data.title}
            image={DefaultBgImage}
            title={data.title}
          />
        );
    }
  };

  return (
    <>
      <Card className={classes.card} onDoubleClick={handleCardAction}>
        <CardActionArea >
          {renderCardMedia()}
        </CardActionArea>

        <CardHeader
          title={data.title}
          titleTypographyProps={{
            variant: "h6",
            fontWeight: 300,
            lineHeight: "1.5rem"
          }}
          classes={{
            root: classes.cardTitle
          }}
        />

        <CardContent classes={{ root: classes.cardBody }}>
          {/* <Typography p={0} lineHeight="1.5rem" className={classes.cardBody} fontSize="body2.fontSize">
            {data?.content}
          </Typography> */}
          <ContentViewer item={data} displayContent={false} />
        </CardContent>

        <CardActions sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={handleLike} aria-label="like">{liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorderIcon />} </IconButton>
          <IconButton aria-label="comment"><CommentIcon /></IconButton>
          <Button onClick={() => navigate(`/${data.type?.toLowerCase()}`)}>
            More
          </Button>
        </CardActions>
      </Card>
      <DynamicModal open={modalData.open} handleClose={handleModalClose} header={data.title} hideFooter={true}>
        <ContentViewer item={data} displayContent={true} />
        {/* {data.content} */}
      </DynamicModal>
    </>
  );
}
CardView.propTypes = {
  data: shape({
    backgroundImg: string,
    title: string.isRequired,
    content: string
  })
};
export default CardView;
