import React from "react";
import "./styles.scss";

interface Props {
  title: string;
}

export function Genre(props: Props) {
  const { title } = props;
  return (
    <div className="genre">
      <p>{title}</p>
    </div>
  )
}