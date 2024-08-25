import { useParams } from "react-router-dom";

export default function UpdateBook() {
  const { id } = useParams();

  return <div>UpdateBook{id}</div>;
}
