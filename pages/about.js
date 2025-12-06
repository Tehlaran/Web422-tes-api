import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer — Esther Nascimento" />
      <p>
        I’m building a small app using Open Library for my Assignment for WEB422.
        Below is <em>The Idiot</em> by Fyodor Dostoevsky—one of my favourite novels.
        With this book, the author focos on Prince Myshkin, and he knows how to describe the duality of good and bad things in life, and also represents many personalities around him.
      </p>
      <p>
        Even though this book was written more than a hundred years ago, we can
        still relate to it today. We still see good people struggling in a world
        that often rewards the opposite, and we still ask ourselves if kindness
        can survive in a society full of ambition and conflict. That is why I
        believe <em>The Idiot</em> is an important story even now.
      </p>

      {/* Renders the cover + details using your existing BookDetails layout */}
      <BookDetails book={book} />
    </>
  );
}


export async function getStaticProps() {

    const workId = "OL166973W";
  
    
    const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
    if (!res.ok) return { props: { book: null }, revalidate: 3600 };
    const data = await res.json();
  
    
    if (!Array.isArray(data.covers) || data.covers.length === 0) {
      try {
        const edRes = await fetch(
          `https://openlibrary.org/works/${workId}/editions.json?limit=20`
        );
        if (edRes.ok) {
          const edData = await edRes.json();
          const withCover = edData?.entries?.find(
            (e) => Array.isArray(e.covers) && e.covers.length > 0
          );
          if (withCover?.covers?.[0]) {
           
            data.covers = [withCover.covers[0]];
          }
        }
      } catch (_) {
        
      }
    }
  
    return { props: { book: data }, revalidate: 3600 };
  }