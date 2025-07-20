import React from 'react'
import type { Songs } from '../types/song'
import './TarjetaCanciones.css'
import { $currentSong } from '../store'

interface Props {
    song: Songs
}

export default function ({ song }: Props) {

    function handlerClick() {
        $currentSong.set(song)
        
    }

    return (
        <div className='Tarjeta'>
            <div className='Cancion'>
                <img src={song.image.url} alt="" />
                <div>
                    <h1>{song.title}</h1>
                    <p>{song.author}</p>
                </div>
            </div>
            <div>
                <button className='botonplay'
                    onClick={handlerClick}
                >
                    Play</button>
            </div>

        </div>

    )
}