import Navbar from "./components/Navbar";
import Recipes from "./pages/recipes";

function App() {
  return (
    <>
      <div className="bg-[#050514] h-screen text-[#ebebeb]">
        <Navbar/>
        <Recipes />
      </div>
    </>
  );
}

export default App;
