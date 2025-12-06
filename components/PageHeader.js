
import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h4 className="mb-1">{text}</h4>
          {subtext ? <div className="text-muted">{subtext}</div> : null}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
