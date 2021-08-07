import React, {useState, useRef} from "react";

import "./Styles/app.scss";

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

import data from "./data";

function App() {
    //Ref
    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);
    const handleTimeUpdate = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) *100);

        setSongInfo({...songInfo,
            currentTime: current,
            duration,
            animationPercentage:animation});
    };
    const handleSongEnd = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length ]);
        if(isPlaying) {
            audioRef.current.play();
        }

    }

    return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
     <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
     <Song currentSong={currentSong}/>
     <Player audioRef={audioRef}
             setIsPlaying={setIsPlaying}
             isPlaying={isPlaying}
             currentSong={currentSong}
             setSongInfo={setSongInfo}
             songInfo={songInfo}
             songs={songs}
             setCurrentSong={setCurrentSong}
             setSongs={setSongs}
     />
        <Library audioRef={audioRef}
                 songs={songs}
                 setSongs={setSongs}
                 setCurrentSong={setCurrentSong}
                 isPlaying={isPlaying}
                 libraryStatus={libraryStatus}
        />
        <audio onTimeUpdate={handleTimeUpdate}
               onLoadedMetadata={handleTimeUpdate}
               ref={audioRef}
               src={currentSong.audio}
               onEnded={handleSongEnd}
        />
    </div>
  );
}

export default App;
