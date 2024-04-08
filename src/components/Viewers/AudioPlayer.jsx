import { useState, useEffect, useRef } from "react";

import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, IconButton, Button } from "@mui/material";

const AudioPlayer = (item) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); // Track current audio index
  const [audio, setAudio] = useState(new Audio(item.content[0]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress of the song in percentage
  const progressBarRef = useRef(); // Reference to the progress bar for calculating click positions

  useEffect(() => {
    // Setup a new Audio object whenever the currentAudioIndex changes
    const newAudio = new Audio(item.content[currentAudioIndex]);
    setAudio(newAudio);
    setProgress(0); // Reset progress
    if (isPlaying) {
      newAudio.play().catch((err) => console.error("Error attempting to play", err));
      setIsPlaying(true);
    }

    // Cleanup function to pause and unload audio when changing tracks or component unmounts
    return () => {
      newAudio.pause();
    };
  }, [currentAudioIndex, item.content, isPlaying]);

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress || 0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Cleanup listeners when component unmounts or audio changes
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Error attempting to play", err));
    }
    setIsPlaying(!isPlaying);
  };

  const seekAudio = (event) => {
    const progressBar = progressBarRef.current;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const clickXPercentage = clickX / progressBar.offsetWidth;
    audio.currentTime = clickXPercentage * audio.duration;
  };

  const goToNextTrack = () => {
    if (currentAudioIndex < item.content.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };
  const goToPreviousTrack = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
      }}
    >
      <IconButton
        aria-label={isPlaying ? "pause" : "play"}
        onClick={togglePlayPause}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)"
          },
          mb: 2
        }}
      >
        {isPlaying ? (
          <PauseCircleOutlineIcon sx={{ fontSize: 60, color: "primary.main" }} />
        ) : (
          <PlayCircleOutlineIcon sx={{ fontSize: 60, color: "primary.main" }} />
        )}
      </IconButton>
      <Box
        ref={progressBarRef}
        onClick={seekAudio}
        sx={{
          width: "100%",
          height: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          borderRadius: "3px",
          border: "1px solid gray",
          mb: 2
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "secondary.main",
            borderRadius: "3px"
          }}
        ></Box>
      </Box>
      {item.content.length > 1 && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            startIcon={<SkipPreviousIcon />}
            onClick={goToPreviousTrack} // Define this function to handle going to the previous track
            disabled={currentAudioIndex <= 0} // Disable the button if we're at the first track
          >
            {/* Previous */}
          </Button>
          <Button
            startIcon={<SkipNextIcon />}
            onClick={goToNextTrack}
            disabled={currentAudioIndex >= item.content.length - 1}
          >
            {/* Next */}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AudioPlayer;
