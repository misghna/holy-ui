import { Box, Typography, Divider, Grid } from "@mui/material";

const ImageDisplayer = (item, onDoubleClick, displayContent) => {
  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent ? (
        <ImageGallery images={item.content} />
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" display="block" gutterBottom>
            {item.date}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" gutterBottom>
            {item.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default ImageDisplayer;

export const ImageGallery = (images) => {
  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: -8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              height: 220,
              // width: 400,
              "& img": {
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                objectFit: "cover" // Adjust as needed
              }
            }}
          >
            <img src={image} alt={`Gallery image ${index + 1}`} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
