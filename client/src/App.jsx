import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register"
import Login from "./components/Login"
import Post from "./components/Post"
import Profile from './components/Profile'
import Edit from './components/Edit'
import ThemeToggle from "./components/ThemeToggle";

function App() {

  return (
    <div className="h-screen w-full font-[Poppins]">
      <Routes>
        <Route path="/" element={<><Home /><ThemeToggle /></>} />
        <Route path="/register" element={<><Register /><ThemeToggle /></>} />
        <Route path="/login" element={<><Login /><ThemeToggle /></>} />
        <Route path="/posts" element={<><Post /><ThemeToggle /></>} />
        <Route path="/:user" element={<><Profile /><ThemeToggle /></>} />
        <Route path="/:user/edit" element={<><Edit /><ThemeToggle /></>} />
      </Routes>
    </div>
  );
}

export default App;
