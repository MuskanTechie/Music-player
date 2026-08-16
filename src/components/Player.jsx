import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaBackward,
  FaForward
} from "react-icons/fa";

function Player({
  currentSong,
  songs,
  playlist,
  setCurrentSong,
  autoPlay,
  setAutoPlay
}) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ================= CURRENT PLAYING LIST =================

  const getPlayingList = () => {
    if (!currentSong) return [];

    const isInPlaylist = playlist.some(
      (song) => song.id === currentSong.id
    );

    if (isInPlaylist) {
      return playlist;
    }

    return songs;
  };

  // ================= LOAD CURRENT SONG =================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    audio.pause();

    audio.src = currentSong.audio;
    audio.volume = volume / 100;

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    audio.load();

    const playWhenReady = async () => {
      if (!autoPlay) return;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Auto playback failed:", error);
      }

      setAutoPlay(false);
    };

    audio.addEventListener(
      "canplay",
      playWhenReady,
      { once: true }
    );

    return () => {
      audio.removeEventListener(
        "canplay",
        playWhenReady
      );
    };
  }, [currentSong]);

  // ================= AUDIO EVENTS =================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (!currentSong) {
        setIsPlaying(false);
        return;
      }

      const playingList = getPlayingList();

      if (playingList.length === 0) {
        setIsPlaying(false);
        return;
      }

      const currentIndex = playingList.findIndex(
        (song) => song.id === currentSong.id
      );

      if (
        currentIndex !== -1 &&
        currentIndex < playingList.length - 1
      ) {
        setAutoPlay(true);

        setCurrentSong(
          playingList[currentIndex + 1]
        );
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
        setAutoPlay(false);
      }
    };

    audio.addEventListener(
      "timeupdate",
      updateTime
    );

    audio.addEventListener(
      "loadedmetadata",
      updateDuration
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [
    currentSong,
    songs,
    playlist
  ]);

  // ================= PLAY / PAUSE =================

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error(
        "Audio playback failed:",
        error
      );
    }
  };

  // ================= REWIND 10 SECONDS =================

  const rewindAudio = () => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    const newTime = Math.max(
      0,
      audio.currentTime - 10
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // ================= FORWARD 10 SECONDS =================

  const forwardAudio = () => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    const maxTime =
      duration || audio.duration || 0;

    const newTime = Math.min(
      maxTime,
      audio.currentTime + 10
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // ================= NEXT SONG =================

  const nextSong = () => {
    if (!currentSong) return;

    const playingList = getPlayingList();

    if (playingList.length === 0) return;

    const currentIndex = playingList.findIndex(
      (song) => song.id === currentSong.id
    );

    if (currentIndex === -1) return;

    if (
      currentIndex <
      playingList.length - 1
    ) {
      setAutoPlay(true);

      setCurrentSong(
        playingList[currentIndex + 1]
      );
    }
  };

  // ================= PREVIOUS SONG =================

  const previousSong = () => {
    if (!currentSong) return;

    const playingList = getPlayingList();

    if (playingList.length === 0) return;

    const currentIndex = playingList.findIndex(
      (song) => song.id === currentSong.id
    );

    if (currentIndex === -1) return;

    if (currentIndex > 0) {
      setAutoPlay(true);

      setCurrentSong(
        playingList[currentIndex - 1]
      );
    }
  };

  // ================= VOLUME =================

  const handleVolume = (e) => {
    const newVolume = Number(
      e.target.value
    );

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume =
        newVolume / 100;
    }
  };

  // ================= PROGRESS =================

  const handleProgress = (e) => {
    const newTime = Number(
      e.target.value
    );

    setCurrentTime(newTime);

    if (audioRef.current) {
      audioRef.current.currentTime =
        newTime;
    }
  };

  // ================= FORMAT TIME =================

  const formatTime = (time) => {
    if (!time || isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(
      time / 60
    );

    const seconds = Math.floor(
      time % 60
    );

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="player">

      <audio
        ref={audioRef}
        preload="metadata"
      />

      {/* ================= CURRENT SONG ================= */}

      <div className="player-song">

        <div className="player-cover">

          <img
            src={
              currentSong?.cover ||
              "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=200&q=80"
            }
            alt={
              currentSong?.title ||
              "Nature Sound"
            }
          />

        </div>

        <div>

          <h4>
            {currentSong?.title ||
              "Select a sound"}
          </h4>

          <p>
            {currentSong?.artist ||
              "Nature Sounds"}
          </p>

        </div>

      </div>

      {/* ================= CONTROLS ================= */}

      <div className="player-controls">

        <div className="control-buttons">

          {/* PREVIOUS */}

          <button
            onClick={previousSong}
            disabled={!currentSong}
            title="Previous Song"
          >
            <FaStepBackward />
          </button>

          {/* REWIND */}

          <button
            onClick={rewindAudio}
            disabled={!currentSong}
            title="Rewind 10 seconds"
          >
            <FaBackward />
          </button>

          {/* PLAY / PAUSE */}

          <button
            className="main-play"
            onClick={togglePlay}
            disabled={!currentSong}
            title="Play / Pause"
          >
            {isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>

          {/* FORWARD */}

          <button
            onClick={forwardAudio}
            disabled={!currentSong}
            title="Forward 10 seconds"
          >
            <FaForward />
          </button>

          {/* NEXT */}

          <button
            onClick={nextSong}
            disabled={!currentSong}
            title="Next Song"
          >
            <FaStepForward />
          </button>

        </div>

        {/* ================= PROGRESS ================= */}

        <div className="progress-area">

          <span>
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            disabled={!currentSong}
          />

          <span>
            {formatTime(duration)}
          </span>

        </div>

      </div>

      {/* ================= VOLUME ================= */}

      <div className="volume-control">

        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolume}
        />

      </div>

    </div>
  );
}

export default Player;