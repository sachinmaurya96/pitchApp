import StartUpCard, { StartupTypeCard } from "@/components/StartUpCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/query";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";
  const params = {search:query || null}
  const {data:posts} = await sanityFetch({query: STARTUPS_QUERY,params})

  return (
    <>
      <section className="pink_container ">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Contact With Enterprenure
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote pin pitches , and get noticed in Virtual
          Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "Latest Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:StartupTypeCard) => <StartUpCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found </p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
