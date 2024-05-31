import { useCallback, useRef, useState } from "react";

import { Box, FormControl, Typography, styled, CircularProgress } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import CustomButton from "~/components/CustomButton";
import ImageItem from "~/components/ImageItem";
import Loading from "~/components/Loading";
import DynamicModal from "~/components/Modal";
import NoData from "~/components/NoData";

const StyledTypography = styled(Typography)({
  marginBottom: "8px",
  whiteSpace: "nowrap",
  minWidth: "100px",
  textTransform: "capitalize"
});

const SelectImageButton = ({
  label,
  name,
  loading,
  hasMore,
  fetchImageList,
  imageList,
  imageUrls,
  addImageSelectionInPageConfig,
  ...rest
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const scrollableRef = useRef(null);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const handleItemClick = useCallback(
    (id) => {
      const imageExist = selectedItem.find((item) => item === id);
      if (imageExist) {
        const index = selectedItem.indexOf(id);
        const selectedItemTemp = [...selectedItem];
        selectedItemTemp.splice(index, 1);
        setSelectedItem(selectedItemTemp);
        return;
      }
      setSelectedItem((prevItem) => [...prevItem, id]);
    },
    [selectedItem]
  );
  const imageListActionHandler = () => {
    addImageSelectionInPageConfig(name, selectedItem);
    handleModalClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.stopPropagation();
    }
  };

  const renderImage = useCallback(() => {
    if (loading) {
      return <Loading />;
    }
    if (!loading & (imageList.length === 0)) {
      return <NoData />;
    }
    return (
      <Box
        ref={scrollableRef}
        id="scrollableDiv"
        tabIndex="0"
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: 2,
          whiteSpace: "nowrap"
        }}
        onKeyDown={handleKeyDown}
      >
        <InfiniteScroll
          dataLength={imageList.length} //This is important field to render the next data
          next={() => fetchImageList(true)}
          hasMore={hasMore}
          hasChildren={false}
          loader={
            <Box display="flex" py={4} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
              <CircularProgress />
            </Box>
          }
          horizontal
          scrollableTarget="scrollableDiv"
        >
          <ImageList sx={{}}>
            {imageList.map((item) => (
              <ImageItem
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
                selectedItem={selectedItem}
                imageUrl={imageUrls[item.id]}
              />
            ))}
          </ImageList>
        </InfiniteScroll>
      </Box>
    );
  }, [fetchImageList, handleItemClick, hasMore, imageList, imageUrls, loading, selectedItem]);

  return (
    <>
      <FormControl fullWidth>
        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <StyledTypography>{label}</StyledTypography>
          <CustomButton label="Select Image" fullWidth handleClick={handleModalOpen} {...rest} />
        </Box>
      </FormControl>
      <DynamicModal
        header={"Select Images"}
        open={modalOpen}
        maxWidth={"md"}
        handleClose={handleModalClose}
        actionHandler={imageListActionHandler}
        actionLabel="Save"
      >
        {renderImage()}
      </DynamicModal>
    </>
  );
};

SelectImageButton.propTypes = {
  label: PropTypes.string.isRequired,

  addImageSelectionInPageConfig: PropTypes.func,
  name: PropTypes.string,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  fetchImageList: PropTypes.func,
  imageList: PropTypes.array,
  imageUrls: PropTypes.object
};

export default SelectImageButton;
