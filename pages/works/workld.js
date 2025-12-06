
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export default function WorkById() {
  const { query: { workId } } = useRouter();
  const { data, error, isLoading } = useSWR(
    () => (workId ? `https://openlibrary.org/works/${workId}.json` : null)
  );

  if (isLoading) return null;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data?.title ?? "Work"} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
