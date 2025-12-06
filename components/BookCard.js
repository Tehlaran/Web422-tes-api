
import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    () => (workId ? `https://openlibrary.org/works/${workId}.json` : null)
  );

  if (error || !data) return <Error statusCode={404} />;

  const coverId = data?.covers?.[0];
  const firstDate = data?.first_publish_date || "N/A";

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://placehold.co/300x450?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={
          coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://placehold.co/300x450?text=Cover+Not+Available"
        }
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data?.title || ""}</Card.Title>
        <Card.Text>{firstDate}</Card.Text>
        <Button as={Link} href={`/works/${workId}`} variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}
