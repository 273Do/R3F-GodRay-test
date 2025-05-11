import "./App.css";
import GRMain from "./components/GR/GRMain";
import Three from "./components/Three";

function App() {
  return (
    <>
      <div className="header">
        <span>Hello</span>
        <span>ABOUT</span>
        <span>BLOG</span>
        <span>SHOP</span>
      </div>
      {/* <Three className="scene" /> */}
      <GRMain className="scene" />
    </>
  );
}

export default App;
