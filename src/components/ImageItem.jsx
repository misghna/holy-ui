import { useTheme } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PropTypes from "prop-types";

function ImageItem({ item, handleItemClick, selectedItem, imageUrl }) {
  const theme = useTheme();

  return (
    <ImageListItem
      key={+item.id}
      onClick={() => {
        handleItemClick(item.id);
      }}
      sx={{
        border: selectedItem.includes(item.id) ? `2px solid ${theme.palette.primary.main}` : "",
        padding: "2px"
      }}
    >
      <img src={imageUrl} alt={item.file_name} loading="lazy" />
      <ImageListItemBar title={item.title} subtitle={<span>by: {item.created_by}</span>} position="below" />
    </ImageListItem>
  );
}
ImageItem.propTypes = {
  item: PropTypes.object,
  handleItemClick: PropTypes.func,
  selectedItem: PropTypes.array,
  imageUrl: PropTypes.string
};

export default ImageItem;
