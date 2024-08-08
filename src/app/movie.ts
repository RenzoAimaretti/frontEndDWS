import { Genre } from './genre';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    genres: Genre[];
    poster_path: string;
    release_date: string;
    /*
    dejamos el tema de los votos para lo ultimo
    vote_average: number;
    vote_count: number;
    */
    origin_country: string;
    original_language: string
    }