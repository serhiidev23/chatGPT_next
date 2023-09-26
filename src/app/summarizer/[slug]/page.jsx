import { Summarizer } from "components/Tools";

const Page = ({ params }) => {
  return (
    <>
      <Summarizer uid={params.slug} />
    </>
  );
};

export default Page;
