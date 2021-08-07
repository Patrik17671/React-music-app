import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";


const Player = ({
                    audioRef,
                    currentSong,
                    isPlaying,
                    setIsPlaying,
                    setSongInfo,
                    songInfo,
                    songs,
                    setCurrentSong,
                    setSongs}) => {


    //Event Handlers
    const handleActiveLibrary = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return{
                    ...song,
                    active:true,
                };
            }else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }

    const handlePlaySong = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const handledrag = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const handleSkipTrack = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward"){
          await setCurrentSong(songs[(currentIndex + 1) % songs.length ]);
          handleActiveLibrary(songs[(currentIndex + 1) % songs.length ]);
        }
        if(direction === "skip-back"){
            if((currentIndex - 1) % songs.length === -1 ){
              await setCurrentSong(songs[songs.length - 1]);
                handleActiveLibrary(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
          await setCurrentSong(songs[(currentIndex - 1) % songs.length ]);
            handleActiveLibrary(songs[(currentIndex - 1) % songs.length ]);
        }
        if(isPlaying) audioRef.current.play();
    };
    //Time formatter
    const getTime = (time) => {
        return(Math.floor(time / 60) + ":" + ("0" + Math.floor( time % 60)).slice(-2));
    };
    //Add styles
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0 }
                        value={songInfo.currentTime}
                        onChange={handledrag}
                        type="range"
                    />
                    <div style={trackAnimation} className="animate-track" />
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() =>  handleSkipTrack("skip-back")}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={handlePlaySong}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon
                    onClick={() =>  handleSkipTrack("skip-forward")}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
