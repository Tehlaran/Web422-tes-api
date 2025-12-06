
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== "")),
    });
  };

  return (
    <>
      <PageHeader text="Search" subtext="Find books by author, title, subject, language, or year." />

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row className="gy-3">
          <Col md={6}>
            <Form.Label>Author *</Form.Label>
            <Form.Control
              className={errors.author ? "is-invalid" : ""}
              placeholder="e.g., Fyodor Dostoevsky"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
          </Col>

          <Col md={6}>
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="e.g., The Idiot" {...register("title")} />
          </Col>

          <Col md={6}>
            <Form.Label>Subject</Form.Label>
            <Form.Control placeholder="e.g., Russia" {...register("subject")} />
          </Col>

          <Col md={3}>
            <Form.Label>Language</Form.Label>
            <Form.Control placeholder="e.g., eng, fre, spa" {...register("language")} />
          </Col>

          <Col md={3}>
            <Form.Label>First Publish Year</Form.Label>
            <Form.Control type="number" placeholder="e.g., 1869" {...register("first_publish_year")} />
          </Col>
        </Row>

        <br />
        <Button type="submit">Search</Button>
      </Form>
    </>
  );
}
