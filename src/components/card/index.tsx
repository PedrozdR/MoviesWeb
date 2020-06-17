import React, { useState, useEffect } from "react";
import { IGenre, IMovie } from "../../services/models";
import { Link } from "react-router-dom";
import { Genre } from "../genre";
import moment from "moment";
import "./styles.scss";

interface Props {
  movie: IMovie;
  genres?: IGenre[];
}

export default function Card(props: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const { movie, genres } = props;

  useEffect(() => {
    const tagsAux: string[] = [];
    if (!genres) return;
    genres.forEach(genre => {
      movie.genre_ids.forEach(id => {
        if (id === genre.id) {
          tagsAux.push(genre.name);
        }
      });
    });
    setTags(tagsAux);
  }, [genres, movie.genre_ids]);


  return (
    <Link to={`/${movie.id}`}>
      <figure className='movieContainer'>
        <picture>
          <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : require("../../assets/img/placeholder.jpg")} alt="" />
        </picture>
        <figcaption>
          <div className="cardHeader">
            <h2 className="grade">{`${movie.vote_average * 10}%`}</h2>
            <h2 className="title">{movie.title}</h2>
          </div>
          <div className="cardContent">
            <h3 className="releaseDate">{moment(movie.release_date).format("DD/MM/YYYY")}</h3>
            <div className="container">
              <p className="overview">{movie.overview ? movie.overview : "Sinópse não cadastrada"}</p>
              <div className="genres">
                {tags.map((genre, index) => (
                  <Genre key={index} title={genre} />
                ))}
              </div>
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  )
}