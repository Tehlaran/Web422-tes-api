
// pages/favourites.js
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <>
      <h1>Favourites</h1>

      {(!favouritesList || favouritesList.length === 0) && (
        <p>No favourites added yet.</p>
      )}

      {favouritesList && favouritesList.length > 0 && (
        <Row className="g-3">
          {favouritesList.map((workId) => (
            <Col key={workId} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Favourite Work</Card.Title>
                  <Card.Text>
                    Work ID: <code>{workId}</code>
                  </Card.Text>
                  {/* 
                    If you already have a details page route like /books/[id],
                    you can turn this into a <Link> to that page later.
                  */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
