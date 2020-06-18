import React, { useState, useEffect } from 'react';
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

  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const pageNumbers: number[] = [];

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
  function onBack() {
    setPage(oldValue => oldValue - 1);
  }

  function onNext() {
    setPage(oldValue => oldValue + 1);
  }

  for (let i = page; i < page + 5; i++) {
    if (i <= totalPage) pageNumbers.push(i);
  }

  return (
    <>
      <Header onClick={() => setPage(1)} />
      <div className="home">
        <Search placeholder="Busque um filme por nome, ano ou gênero..." onChange={(text) => handleChange(text)} value={query} />
        {query !== "" ? (
          <>
            {searched.map((movie, index) => (
              <Card key={index} movie={movie} genres={genres} />
            ))}
            <ul className="paginationContainer">
              {pageNumbers.map(item => (
                <li className={item === searchPage ? "active" : ''} key={item}>
                  <a href="/#" onClick={() => { setSearchPage(item) }}>{item}</a>
                </li>
              ))}
            </ul>
          </>
        ) : (
            <>
              {movies.map((movie, index) => (
                <Card key={index} movie={movie} genres={genres} />
              ))}
              <ul className="paginationContainer">
                {page !== 1 &&
                  <li>
                    <a href="/#" onClick={onBack}>Voltar </a>
                  </li>
                }
                {pageNumbers.map(item => (
                  <li className={item === page ? "active" : ''} key={item}>
                    <a href="/#" onClick={() => { setPage(item) }}>{item}</a>
                  </li>
                ))}
                <li>
                  <a href="/#" onClick={onNext}>Avançar </a>
                </li>
              </ul>
            </>
          )
        }


      </div>
    </>

  );
}
