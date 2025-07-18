import React from "react";
import { HiPlayPause } from "react-icons/hi2";
import { BiSkipPrevious } from 'react-icons/bi';
import { BiSkipNext } from 'react-icons/bi';
import { RiVolumeUpFill } from "react-icons/ri";
import './Reproductor.css'

export default function () {


    return (
        <div className="reproductor">
            <div className="contenedor1">
                <div>
                    <img className="image" src="" alt="" />
                </div>
                <div>
                    <h1 className="titulo"></h1>
                    <p className="autor"></p>
                </div>
            </div>
            <div className="contenedor2">
                <input type="range" className="barra" />
                <div className="botones">
                    <button className="botob"><BiSkipPrevious /></button>
                    <button className="play"><HiPlayPause /></button>
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