import React, { InputHTMLAttributes } from "react";
import { Input } from "./styles";

interface Props extends InputHTMLAttributes<any> {
}

export default function Search(props: Props) {
  return (
    <Input.Container  {...props} />
  )
}