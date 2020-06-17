import api from "../api";
import { AxiosRequestConfig } from "axios";
import { IMovie, IResponse } from ".././models";


export default {
  async getMovies(page: number) {
    const config: AxiosRequestConfig = {
      params: {
        api_key: "40d98ef34b20518e6f023cdf6e2556d5",
        sort_by: "vote_count.desc",
        language: "pt-br",
        include_adult: false,
        include_video: true,
        page,
      },
    };
    try {
      const { data } = await api.get<IResponse<IMovie[]>>("/discover/movie", config);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getSearch(query: string, page: number) {
    const config: AxiosRequestConfig = {
      params: {
        api_key: "40d98ef34b20518e6f023cdf6e2556d5",
        include_adult: false,
        language: "pt-br",
        page,
        query,
      },
    };
    try {
      const { data } = await api.get<IResponse<IMovie[]>>("/search/movie", config);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getGenres() {
    const config: AxiosRequestConfig = {
      params: {
        api_key: "40d98ef34b20518e6f023cdf6e2556d5",
        language: "pt-br",
      },
    };
    try {
      const { data } = await api.get("/genre/movie/list", config);
      return Promise.resolve(data.genres);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getDetails(movie_id: string) {
    const config: AxiosRequestConfig = {
      params: {
        api_key: "40d98ef34b20518e6f023cdf6e2556d5",
        movie_id,
        language: "pt-br",
      },
    };
    try {
      const { data } = await api.get(`/movie/${movie_id}`, config);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getVideos(movie_id: string) {
    const config: AxiosRequestConfig = {
      params: {
        api_key: "40d98ef34b20518e6f023cdf6e2556d5",
        language: "pt-br",
      },
    };
    try {
      const { data } = await api.get(`/movie/${movie_id}/videos`, config);
      return Promise.resolve(data.results);
    } catch (error) {
      return Promise.reject(error);
    }
  },

}
