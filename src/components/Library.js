import React from 'react';
import LibrarySong from "./LibrarySong";
import {library} from "@fortawesome/fontawesome-svg-core";

const Library = ({songs, setCurrentSong,setSongs, audioRef, isPlaying, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibrarySong
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        song={song}
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />))}
            </div>
        </div>
    );
};

export default Library;
