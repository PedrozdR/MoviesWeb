import React, { useState, useEffect } from 'react';
import Header from "../../components/header";
import MovieService from '../../services/movie';
import { IDetails, IVideo } from '../../services/models';
import { RouteComponentProps } from 'react-router';
import "./styles.scss";
import Details from '../../components/details';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
}

export default function DetailsScreen(props: Props) {
  const [details, setDetails] = useState<IDetails>();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { match } = props;

  useEffect(() => {
    async function getDetails() {
      try {
        const resp = await MovieService.getDetails(match.params.id);
        setDetails(resp);
      } catch (error) {
        console.log(error);
      }
    }
    async function getVideos() {
      try {
        const resp = await MovieService.getVideos(match.params.id);
        setVideos(resp.filter((result: any) => { return result.type === "Trailer" }));
      } catch (error) {
        console.log(error);
      }
    }
    getVideos();
    getDetails();
  }, [match.params.id])

  return (
    <>
      <Header />
      <main className="container">
        {details &&
          <Details movie={details} trailers={videos} />
        }
      </main>
    </>

  );
}
