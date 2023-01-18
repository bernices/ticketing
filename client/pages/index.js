import axios from "axios";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: {
        Host: "ticketing.dev", //for ingress-nginx to know what service and port to go
      },
    }
  );
  // Pass data to the page via props
  console.log(data);
  return { props: { currentuser: data } };
}

export default LandingPage;
