import { useParams } from "react-router-dom";

export default function getParamsId() {
  const { id } = useParams();
  return id;
}