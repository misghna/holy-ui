import { useCallback, useEffect, useRef, useState } from "react";

import { Box, FormControl, Typography, styled, CircularProgress } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { axiosPrivate } from "~/_api";
import CustomButton from "~/components/CustomButton";
import Loading from "~/components/Loading";
import DynamicModal from "~/components/Modal";
import NoData from "~/components/NoData";

import ImageItem from "./ImageItem";
const StyledTypography = styled(Typography)({
  marginBottom: "8px",
  whiteSpace: "nowrap",
  minWidth: "100px",
  textTransform: "capitalize"
});

const SelectImageButton = ({
  label,
  name,
  imageData,
  fetchData,
  loading,
  hasMore,
  addImageSelectionInPageConfig,
  ...rest
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const scrollableRef = useRef(null);
  const [imageUrls, setImageUrls] = useState({});

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
  const fetchImages = useCallback(async () => {
    try {
      const requests = imageData.map((item) =>
        axiosPrivate.get(`https://holydemo.com/api/protected/file`, {
          params: {
            id: item.id,
            thumbnail: true
          },
          responseType: "blob"
        })
      );

      const responses = await Promise.all(requests);
      const urls = responses.reduce((acc, response, index) => {
        const imageUrl = URL.createObjectURL(response.data);
        acc[imageData[index].id] = imageUrl;
        return acc;
      }, {});

      setImageUrls(urls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [imageData]);

  useEffect(() => {
    if (imageData.length > 0) {
      fetchImages();
    }
  }, [imageData, fetchImages]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, []);
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.stopPropagation();
    }
  };

  const renderImage = useCallback(() => {
    if (loading) {
      return <Loading />;
    }
    if (!loading && imageData.length === 0) {
      return <NoData />;
    }
    return (
      <Box
        ref={scrollableRef}
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
          dataLength={imageData.length} //This is important field to render the next data
          next={() => fetchData(true)}
          hasMore={hasMore}
          hasChildren={false}
          loader={
            <Box display="flex" py={4} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
              <CircularProgress />
            </Box>
          }
          horizontal
        >
          <ImageList sx={{}}>
            {imageData.map((item) => (
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
  }, [fetchData, handleItemClick, hasMore, imageData, imageUrls, loading, selectedItem]);

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
  imageData: PropTypes.array,
  addImageSelectionInPageConfig: PropTypes.func,
  name: PropTypes.string,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
  hasMore: PropTypes.func
};

export default SelectImageButton;
