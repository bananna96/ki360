import { client }  from "@/lib/sanity/client";

const chaptersQuery = `*[_type == "chapter"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  intro
}`;

export default async function Home() {
  const chapters = await client.fetch(chaptersQuery);

  return (
    <>
    <main className="h-[100vh] w-[100vw]">
      <div className="h-[100vh] w-[100vw] flex items-end justify-start">
        <h1>Was ist KI?</h1>
      {/* {chapters.map((c: any) => (
        <div key={c._id} style={{ marginBottom: 16 }}>
          <h2>{c.title}</h2>
          <div>Slug: {c.slug}</div>
          {c.intro ? <p>{c.intro}</p> : null}
        </div>
      ))}       */}
      </div>
    </main>
    </>
  );
}
