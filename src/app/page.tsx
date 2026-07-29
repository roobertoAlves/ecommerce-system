import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <Container className="bg-shop-light-pink">
      <h2 className={`text-xl font-semibold`}>Home</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat
        soluta facere deserunt repudiandae, nemo debitis fuga similique enim
        officiis, a cumque quisquam aspernatur dolores, perferendis dicta
        voluptate cupiditate vel!
      </p>
      <Button> Check </Button>
    </Container>
  );
};

export default Home;
