import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SongList from "./components/SongList";
import Player from "./components/Player";
import songs from "./data/songs";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentSong, setCurrentSong] =
    useState(null);

  const [autoPlay, setAutoPlay] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  // ================= FAVORITES =================

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const toggleFavorite = (song) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) => item.id === song.id
      );

      const updated = exists
        ? prev.filter(
            (item) => item.id !== song.id
          )
        : [...prev, song];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // ================= PLAYLIST =================

  const [playlist, setPlaylist] = useState(() => {
    const saved = localStorage.getItem("playlist");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const togglePlaylist = (song) => {
    setPlaylist((prev) => {
      const exists = prev.some(
        (item) => item.id === song.id
      );

      const updated = exists
        ? prev.filter(
            (item) => item.id !== song.id
          )
        : [...prev, song];

      localStorage.setItem(
        "playlist",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // ================= DISPLAY SONGS =================

  let songsToDisplay = songs;

  if (activeSection === "favorites") {
    songsToDisplay = favorites;
  }

  if (activeSection === "playlist") {
    songsToDisplay = playlist;
  }

  // ================= FILTER =================

  const filteredSongs = songsToDisplay.filter(
    (song) => {
      const matchesCategory =
        selectedCategory === "All" ||
        song.category === selectedCategory;

      const matchesSearch =
        song.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        song.artist
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );

  // ================= PLAY ALL =================

  const playPlaylist = () => {
    if (playlist.length === 0) return;

    setAutoPlay(true);
    setCurrentSong(playlist[0]);
  };

  // ================= SHUFFLE =================

  const shufflePlaylist = () => {
    if (playlist.length === 0) return;

    const randomIndex = Math.floor(
      Math.random() * playlist.length
    );

    setAutoPlay(true);
    setCurrentSong(
      playlist[randomIndex]
    );
  };

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="main-content">

        {/* ================= HEADER ================= */}

        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* ================= CATEGORIES ================= */}

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={
            setSelectedCategory
          }
        />

        {/* ================= SONG LIST ================= */}

        <SongList
          songs={filteredSongs}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          playlist={playlist}
          togglePlaylist={togglePlaylist}
          activeSection={activeSection}
          playPlaylist={playPlaylist}
          shufflePlaylist={
            shufflePlaylist
          }
           setAutoPlay={setAutoPlay}
        />

        {/* ================= PLAYER ================= */}

        <Player
          currentSong={currentSong}

          songs={filteredSongs}

          playlist={playlist}

          setCurrentSong={
            setCurrentSong
          }

          autoPlay={autoPlay}

          setAutoPlay={setAutoPlay}
        />

      </main>

    </div>
  );
}

export default App;