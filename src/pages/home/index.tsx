import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";

import { IMovie, IGenre } from "../../services/models";
import MovieService from "../../services/movie";
import Header from "../../components/header";
import Search from '../../components/search';
import Card from '../../components/card';
import "../../styles/main.scss"
import "./styles.scss"

export default function HomeScreen() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searched, setSearched] = useState<IMovie[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [query, setQuery] = useState<string>("");

  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getGenres();
    getMovies(page);
  }, [page])


  useEffect(() => {
    getGenres();
    getSearch(query, searchPage);
  }, [searchPage, query])

  async function getMovies(page: number) {
    try {
      const data = await MovieService.getMovies(page);
      setMovies(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSearch(query: string, page: number) {
    try {
      const data = await MovieService.getSearch(query, page);
      if (data.results.length > 0) {
        setMovies([]);
        setPage(1);
        setSearched(data.results);
        setTotalPage(data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getGenres() {
    try {
      const data = await MovieService.getGenres();
      setGenres(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(text: any) {
    setQuery(text.target.value);
    if (text.target.value === "") {
      getMovies(1);
      setSearched([]);
    } else {
      setPage(1);
      getSearch(text.target.value, page);
    }
  }

  return (
    <>
      <Header onClick={() => setPage(1)} />
      <div className="home">
        <Search placeholder="Busque um filme por nome, ano ou gênero..." onChange={(text) => handleChange(text)} value={query} />
        {query.length > 0 ? (
          <>
            {searched.map((movie, index) => (
              <Card key={index} movie={movie} genres={genres} />
            ))}
            <Pagination
              hideDisabled
              activePage={searchPage}
              itemsCountPerPage={1}
              totalItemsCount={totalPage}
              lastPageText='Fim'
              firstPageText='Início'
              onChange={(index) => setSearchPage(index)}
            />

          </>

        ) : (
            <>
              {movies.map((movie, index) => (
                <Card key={index} movie={movie} genres={genres} />
              ))}
              <Pagination
                hideDisabled
                activePage={page}
                itemsCountPerPage={1}
                totalItemsCount={totalPage}
                lastPageText='Fim'
                firstPageText='Início'
                onChange={(index) => setPage(index)}
              />
            </>
          )
        }


      </div>
    </>

  );
}
