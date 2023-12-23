import React from "react";
import "./SongsList.css";

function SongsList({ searchResults }) {
  
  const results = searchResults ?? [];

  return (
    <div className="song-list-overlay">
      <div className="songs-list">
        {results.length === 0 ? (
          <p>No songs found</p>
        ) : (
          <ul>
            {results.map((song) => (
              <li key={song.id}>
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                <span style={{ fontSize: "13px" }}>{song.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SongsList;
