
export interface IResponse<T> {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}

export interface IVideos {
  id: number;
  results: IVideo[];
}

export interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string
}

export interface IMovie {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
export interface IGenre {
  id: number;
  name: string
}

export interface IDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: 11277120;
  runtime: 93;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number
}