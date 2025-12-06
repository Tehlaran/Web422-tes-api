
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  if (!book) return null;

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = () => {
    if (!workId) return; // nothing to toggle
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav != workId));
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, workId]);
      setShowAdded(true);
    }
  };

  return (
    <Container>
      <Row>
        {/* Left: cover */}
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        {/* Right: details + Favourite */}
        <Col lg="8">
          <h3>{book?.title ?? "Untitled"}</h3>

          {book?.description && (
            <p>{typeof book.description === "string" ? book.description : book.description.value}</p>
          )}

          {Array.isArray(book?.subject_people) && book.subject_people.length > 0 && (
            <>
              <h5>Characters</h5>
              <p>{book.subject_people.join(", ")}</p>
            </>
          )}

          {Array.isArray(book?.subject_places) && book.subject_places.length > 0 && (
            <>
              <h5>Settings</h5>
              <p>{book.subject_places.join(", ")}</p>
            </>
          )}

          {Array.isArray(book?.links) && book.links.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((l, i) => (
                <div key={i}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.title || l.url}
                  </a>
                </div>
              ))}
            </>
          )}

          {showFavouriteBtn && workId ? (
            <>
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={favouritesClicked}
              >
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
              </Button>
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
