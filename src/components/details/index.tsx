import React from "react";
import { Genre } from "../genre";
import { IDetails, IVideo, IGenre } from "../../services/models";
import moment from "moment";
import "./styles.scss";

interface Props {
  movie: IDetails;
  trailers: IVideo[];
}

export default function Details(props: Props) {
  const { movie, trailers } = props;


  return (
    <>
      <div className="cardHeader">
        <h2 className="title">{movie.title}</h2>
        <h3>{moment(movie.release_date).format("DD/MM/YYYY")}</h3>
      </div>
      <div className="detailsContainer">
        <figcaption className="contentContainer">
          <div className="section">
            <h2 className="sectionHeader">Sinópse</h2>
            <p className="overview">{movie.overview ? movie.overview : "Sinópse não cadastrada."}</p>
          </div>
          <div className="section">
            <h2 className="sectionHeader">Informações</h2>
            <ul className="informations">
              <li>
                <h4>Situação</h4>
                <p>{movie.status}</p>
              </li>
              <li>
                <h4>Idioma</h4>
                <p>{movie.original_language}</p>
              </li>
              <li>
                <h4>Duração</h4>
                <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</p>
              </li>
              <li>
                <h4>Orçamento</h4>
                <p>R${(movie.budget).toLocaleString("pt-BR")} </p>
              </li>
              <li>
                <h4>Receita</h4>
                <p>R${(movie.revenue).toLocaleString("pt-BR")}</p>
              </li>
              <li>
                <h4>Lucro</h4>
                <p>R${(movie.revenue - movie.budget).toLocaleString("pt-BR")}</p>
              </li>
            </ul>
          </div>
          <div className="bottomContainer">
            <div className="genres" >
              {movie.genres.map((item: IGenre, index) => (
                <Genre title={item.name} key={index} />
              ))}
            </div>

            <h2 className="grade">{`${movie.vote_average * 10}%`}</h2>

          </div>

        </figcaption>
        <figure>
          <picture><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" /></picture>
        </figure>
      </div>
      {trailers.map(vid => (
        <iframe key={vid.id} src={`https://www.youtube.com/embed/${vid.key}`} title={vid.name} allowFullScreen></iframe>
      ))}
    </>
  )
}