import { ChatBot } from "components/Tools";

const Page = ({ params }) => {
  return (
    <>
      <ChatBot uid={params.slug} />
    </>
  );
};
export default Page;
