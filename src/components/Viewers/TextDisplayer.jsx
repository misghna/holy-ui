import { Box } from "@mui/material";
import purify from "dompurify";
import { object, bool, func } from "prop-types";

const TextDisplayer = ({ item, onDoubleClick, displayContent }) => {
  // const partialContent = `${item.content.substring(0, 100)}...`; // Adjust the number based on your needs

  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent && <div dangerouslySetInnerHTML={{ __html: purify.sanitize(item.content_html) }}></div>}
      {/* <Typography variant="caption" display="block" gutterBottom>
        {item.date}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" gutterBottom>
        {item.description}
      </Typography> */}

      {/* <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography id="modal-modal-date" variant="caption" display="block" gutterBottom>
                        {item.date}
                    </Typography>
                    <Box sx={{}}>
                        <Typography id="modal-modal-description" variant="body1"  >
                            {item.content}
                        </Typography>
                    </Box>
                   
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton aria-label="like"><FavoriteBorderIcon /></IconButton>
                        <IconButton aria-label="comment"><CommentIcon /></IconButton>
                        <IconButton aria-label="more"><MoreHorizIcon /></IconButton>
                    </Box>
                </Box>
            </Modal> */}
    </Box>
  );
};

export default TextDisplayer;

TextDisplayer.propTypes = {
  item: object,
  displayContent: bool,
  onDoubleClick: func
};
