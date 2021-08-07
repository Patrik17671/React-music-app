import React from 'react';


const LibrarySong = ({song,songs,id,setSongs, setCurrentSong,audioRef, isPlaying}) => {

    const handleSelectSong = async () => {
        setCurrentSong(song);
        audioRef.current.play();
    const newSongs = songs.map((song) => {
        if(song.id === id) {
            return{
                ...song,
                active:true,
            };
        }else {
            return {
                ...song,
                active:false,
            }
        }
    });
    setSongs(newSongs);
    };
    //Check if is playing

    if(isPlaying) audioRef.current.play();

    return (
        <div onClick={handleSelectSong} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
