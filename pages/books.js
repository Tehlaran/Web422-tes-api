/*********************************************************************************
 *  WEB422 – Assignment 2
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Esther Nascimento  Student ID: 188550230  Date: November 3rd
 ********************************************************************************/



import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  
  const queryString = new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    () => (queryString ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10` : null)
  );

  useEffect(() => { if (data) setPageData(data); }, [data]);

  const previous = () => setPage(p => (p > 1 ? p - 1 : 1));
  const next = () => setPage(p => p + 1);

  if (error) return <p className="text-danger">Failed to load results.</p>;

  const subtext = Object.keys(router.query)
    .map(k => `${k}: ${router.query[k]}`)
    .join("  •  ");

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext || "Use the search form to find books."} />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.length ? (
            pageData.docs.map((book, i) => (
              <tr key={`${book.key}-${i}`} onClick={() => router.push(book.key)} style={{ cursor: "pointer" }}>
                <td>{book.title}</td>
                <td>{book.first_publish_year ?? "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="2">No results</td></tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
