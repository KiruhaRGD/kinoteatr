import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Добро пожаловать!</h1>
      <p>Это главная страница твоего приложения.</p>
      <Navbar />
    </div>
  );
};

export default Home;