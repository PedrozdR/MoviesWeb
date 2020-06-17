import React from "react";
import { Heading } from "./styles";

interface Props {
  onClick?: () => void;
}

export default function Headers(props: Props) {
  const { onClick } = props;
  return (
    <Heading.Container>
      <Heading.Title to="/" onClick={onClick} >
        <h1>Movie</h1>
      </Heading.Title>
    </Heading.Container>
  )
}