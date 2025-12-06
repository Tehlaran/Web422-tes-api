// components/BookDetails.js
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  // 🔹 Hooks must ALWAYS run first, even if book is null
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Sync “Added” state with the server favourites list
  useEffect(() => {
    if (!workId) {
      setShowAdded(false);
      return;
    }
    setShowAdded(favouritesList.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (!workId) return;

    try {
      if (showAdded) {
        // Remove from favourites using API → get updated list
        const updatedList = await removeFromFavourites(workId);
        setFavouritesList(updatedList);
      } else {
        // Add to favourites using API → get updated list
        const updatedList = await addToFavourites(workId);
        setFavouritesList(updatedList);
      }
    } catch (err) {
      console.error("Error updating favourites:", err);
    }
  };

  // 🔹 AFTER hooks are declared, you can return early
  if (!book) return null;

  return (
    <Container>
      <Row>
        {/* Left side: Book Cover */}
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        {/* Right side: Book Details + Favourite Button */}
        <Col lg="8">
          <h3>{book?.title ?? "Untitled"}</h3>

          {book?.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {Array.isArray(book?.subject_people) &&
            book.subject_people.length > 0 && (
              <>
                <h5>Characters</h5>
                <p>{book.subject_people.join(", ")}</p>
              </>
            )}

          {Array.isArray(book?.subject_places) &&
            book.subject_places.length > 0 && (
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

          {/* Favourite Button */}
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
