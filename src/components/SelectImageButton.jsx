import { useCallback, useState } from "react";

import { Box, FormControl, Typography, styled, useTheme } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PropTypes from "prop-types";

import CustomButton from "~/components/CustomButton";
import DynamicModal from "~/components/Modal";

const StyledTypography = styled(Typography)({
  marginBottom: "8px",
  whiteSpace: "nowrap",
  minWidth: "100px",
  textTransform: "capitalize"
});

const SelectImageButton = ({ label, imageData, ...rest }) => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };
  const renderImage = useCallback(() => {
    return (
      <Box sx={{ height: "400px", overflowY: "auto", padding: "8px" }}>
        <ImageList>
          {imageData.map((item, index) => (
            <ImageListItem
              key={item.img}
              onClick={() => {
                handleItemClick(index);
              }}
              sx={{ border: selectedItem === index ? `2px solid ${theme.palette.primary.main}` : "", padding: "2px" }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} subtitle={<span>by: {item.author}</span>} position="below" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  }, [imageData, selectedItem, theme.palette.primary.main]);

  return (
    <>
      <FormControl fullWidth>
        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <StyledTypography>{label}</StyledTypography>
          <CustomButton label="Select Image" fullWidth handleClick={handleModalOpen} {...rest} />
        </Box>
      </FormControl>
      <DynamicModal header={"Select Images"} open={modalOpen} handleClose={handleModalClose} actionLabel="Save">
        {renderImage()}
      </DynamicModal>
    </>
  );
};

SelectImageButton.propTypes = {
  label: PropTypes.string.isRequired,
  imageData: PropTypes.array
};

export default SelectImageButton;
