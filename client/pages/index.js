import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  // Pass data to the page via props
  return { props: { currentUser: data } };
}

export default LandingPage;
