import React from "react";
import { HiPlayPause } from "react-icons/hi2";
import { BiSkipPrevious } from 'react-icons/bi';
import { BiSkipNext } from 'react-icons/bi';
import { RiVolumeUpFill } from "react-icons/ri";
import './Reproductor.css'
import { $currentSong } from "../store";
import type { Songs } from "../types/song";

export default function () {

    const [song, setSong] = React.useState<null | Songs>(null)

    const refAudio = React.useRef<null | HTMLAudioElement> (null)

    const barra = React.useRef<HTMLInputElement | null >(null)

    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    React.useEffect(function () {
        $currentSong.subscribe(function (state) {
            setSong(state)
        })
    }, [])
    
    function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (refAudio.current) {
            refAudio.current.volume = Number(event.target.value) / 100;
        }
    }
    function Progress (event: React.ChangeEvent<HTMLInputElement>) {
        if (refAudio.current) {
            refAudio.current.currentTime = Number(event.target.value);
        }
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    React.useEffect(() => {
        const audio = refAudio.current;
        if (!audio) return;

        function updateBarra() {
            if (!audio) return;
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);

            const barra = document.querySelector<HTMLInputElement>('.barra');
            if (barra) {
                barra.max = audio.duration ? audio.duration.toString() : "0";
                barra.value = audio.currentTime.toString();
            }
        }

        audio.addEventListener('timeupdate', updateBarra);
        audio.addEventListener('loadedmetadata', updateBarra);

        return () => {
            audio.removeEventListener('timeupdate', updateBarra);
            audio.removeEventListener('loadedmetadata', updateBarra);
        };
    }, [song]);


    function handlerPlay () {
        if (refAudio.current) {
            if (refAudio.current.paused){
                refAudio.current.play()
            } else {
                refAudio.current.pause()
            } 
        }
    }



    

    return (
        <div className="reproductor">
            <div className="contenedor1">
                <div>
                    <img className="image" src={song?.image.url} alt="" />
                </div>
                <div>
                    <h1 className="titulo">{song?.title}</h1>
                    <p className="autor">{song?.author}</p>
                </div>
            </div>
            <audio src={song?.audio.url} autoPlay ref={refAudio}></audio>
            <div className="contenedor2">
                <input type="range" className="barra" defaultValue="0" onChange={Progress}/>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="botones">
                    <button className="botob"><BiSkipPrevious /></button>
                    <button className="play" onClick={handlerPlay} ><HiPlayPause /></button>
                    <button className="botob"><BiSkipNext /></button>
                    <div className="volumen">
                        <div className="iconvolumen">
                            <RiVolumeUpFill />
                        </div>
                        <input type="range" className="volumen" defaultValue="100" onChange={handleVolumeChange}/>
                    </div>
                </div>
            </div>
        </div>

    )

}