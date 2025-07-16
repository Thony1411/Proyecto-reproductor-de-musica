import { atom } from 'nanostores'
import type { Songs } from './types/song'

export const $currentSong = atom <null | Songs> (null)