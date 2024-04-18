import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { shape, string } from "prop-types";
import { useNavigate } from "react-router-dom";

import DynamicModal from "~/components/Modal";

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
  const handleModalClose = () => {
    setModalData({});
  };
  function handleCardAction() {
    if (data.content?.length > 0) setModalData({ open: true, data });
  }
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={handleCardAction}>
          <CardMedia
            height={200}
            component="img"
            alt="Contemplative Reptile"
            image={data?.background_image}
            title={data?.title}
          />
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
          <Typography p={0} lineHeight="1.5rem" className={classes.cardBody} fontSize="body2.fontSize">
            {data?.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => navigate(`/${data.contentCategory?.toLowerCase()}`)}>
            More
          </Button>
        </CardActions>
      </Card>
      <DynamicModal open={modalData.open} handleClose={handleModalClose} header="test">
        {data.content}
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
