import { Routes, Route } from "react-router-dom";
import "./App.css";
import Daily from "./pages/Daily";
import Practice from "./pages/Practice";
import About from "./pages/About";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Daily />} />
        <Route path="practice" element={<Practice />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;


