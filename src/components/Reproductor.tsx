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


    React.useEffect(function () {
        $currentSong.subscribe(function (state) {
            setSong(state)
        })
    }, [])
    
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
            <audio src={song?.audio.url} controls autoPlay ref={refAudio}></audio>
            <div className="contenedor2">
                <input type="range" className="barra" />
                <div className="botones">
                    <button className="botob"><BiSkipPrevious /></button>
                    <button className="play" onClick={handlerPlay} ><HiPlayPause /></button>
                    <button className="botob"><BiSkipNext /></button>
                    <div className="volumen">
                        <div className="iconvolumen">
                            <RiVolumeUpFill />
                        </div>
                        <input type="range" className="volumen" name="" id="" />
                    </div>
                </div>
            </div>
        </div>

    )

}