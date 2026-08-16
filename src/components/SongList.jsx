import {
  FaPlay,
  FaHeart,
  FaPlus,
  FaTrash,
  FaMusic,
  FaRandom
} from "react-icons/fa";

function SongList({
  songs,
  setCurrentSong,
  currentSong,
  favorites,
  toggleFavorite,
  playlist,
  togglePlaylist,
  activeSection,
  playPlaylist,
  shufflePlaylist,
    setAutoPlay
}) {
  const isPlaylist = activeSection === "playlist";
  const totalDuration = playlist.reduce((total, song) => {
  const [minutes, seconds] = song.duration.split(":").map(Number);
  return total + minutes * 60 + seconds;
}, 0);

const totalMinutes = Math.floor(totalDuration / 60);
const totalSeconds = totalDuration % 60;
  return (
    <section className="songs-section">

      {/* ================= HEADER ================= */}

      <div className="section-heading">

        <div>
          <h2>
            {activeSection === "favorites"
              ? "Favorite Sounds"
              : isPlaylist
              ? "My Nature Playlist"
              : "Nature Sounds"}
          </h2>

         {isPlaylist && (
  <div className="playlist-meta">
    <p className="playlist-description">
      Peaceful nature sounds for relaxation, focus and sleep.
    </p>

    <p className="playlist-count">
  {playlist.length}{" "}
  {playlist.length === 1 ? "sound" : "sounds"}
  {" • "}
  {totalMinutes} min {totalSeconds.toString().padStart(2, "0")} sec
</p>
  </div>
)}
        </div>

        {isPlaylist && playlist.length > 0 && (
  <div className="playlist-actions">

    <button onClick={playPlaylist}>
      <FaPlay />
      Play All
    </button>

    <button onClick={shufflePlaylist}>
      <FaRandom />
      Shuffle
    </button>

  </div>
)}
        

      </div>

      {/* ================= EMPTY STATE ================= */}

      {songs.length === 0 ? (

        <div className="empty-state">

          {activeSection === "favorites" ? (
            <>
              <FaHeart />

              <h3>No Favorite Sounds</h3>

              <p>
                Tap the heart icon on a sound to save it here.
              </p>
            </>
          ) : (
            <>
              <FaMusic />

              <h3>Your Playlist is Empty</h3>

              <p>
                Add peaceful nature sounds to your playlist.
              </p>
            </>
          )}

        </div>

      ) : isPlaylist ? (

        /* ================= PLAYLIST ================= */

        <div className="playlist-list">

          {songs.map((song, index) => {

            const isFavorite = favorites?.some(
              (item) => item.id === song.id
            );

            return (
              <div
                className="playlist-item"
                key={song.id}
              >

                {/* Number */}

                <span className="playlist-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Cover */}

                <div className="playlist-item-cover">

                  <img
                    src={song.cover}
                    alt={song.title}
                  />

                 
                   <button
                   className="playlist-item-play"
                   onClick={() => {
                   setAutoPlay(true);
                   setCurrentSong(song);
                   }}
                  >
                   <FaPlay />
                 </button>
                </div>

                {/* Song Info */}

               <div className="playlist-item-info">

  <h3>
    {song.title}

    {currentSong?.id === song.id && (
      <span className="playing-indicator">
        ● Playing
      </span>
    )}
  </h3>

  <p>{song.artist}</p>

</div>

                {/* Category */}

                <span className="playlist-category">
                  {song.category}
                </span>

                {/* Duration */}

                <span className="playlist-duration">
                  {song.duration}
                </span>

                {/* Favorite */}

                <button
                  className={`playlist-favorite ${
                    isFavorite
                      ? "favorite-active"
                      : ""
                  }`}
                  onClick={() => toggleFavorite(song)}
                >
                  <FaHeart />
                </button>

                {/* Remove */}

                <button
                  className="playlist-remove"
                  onClick={() => togglePlaylist(song)}
                >
                  <FaTrash />
                </button>

              </div>
            );
          })}

        </div>

      ) : (

        /* ================= NORMAL SONG CARDS ================= */

        <div className="song-grid">

          {songs.map((song) => {

            const isFavorite = favorites?.some(
              (item) => item.id === song.id
            );

            const isInPlaylist = playlist?.some(
              (item) => item.id === song.id
            );

            return (
              <div
            className={`song-card ${
             currentSong?.id === song.id ? "currently-playing" : ""
              }`}
             key={song.id}
            >

                <div className="cover-wrapper">

                  <img
                    src={song.cover}
                    alt={song.title}
                  />

                 <button
                  className="play-btn"
                  onClick={() => {
                   setAutoPlay(true);
                  setCurrentSong(song);
                   }}
                  >
                   <FaPlay />
                  </button>

                  {/* Favorite */}

                  <button
                    className={`favorite-btn ${
                      isFavorite
                        ? "favorite-active"
                        : ""
                    }`}
                    onClick={() => toggleFavorite(song)}
                  >
                    <FaHeart />
                  </button>

                  {/* Playlist */}

                  <button
                    className={`playlist-btn ${
                      isInPlaylist
                        ? "playlist-active"
                        : ""
                    }`}
                    onClick={() => togglePlaylist(song)}
                  >
                    <FaPlus />
                  </button>

                </div>

                <div className="song-info">

                  <h3>{song.title}</h3>

                  <p>{song.artist}</p>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </section>
  );
}

export default SongList;