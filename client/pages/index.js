import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  // Pass data to the page via props
  return { props: data };
}

export default LandingPage;
