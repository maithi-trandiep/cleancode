import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Quiz from "./pages/Quiz";
import UserCard from "./pages/UserCard";
import MyCards from "./pages/MyCards";
import Notification from "./pages/Notification";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/card" element={<UserCard />} />
            <Route path="/mycards" element={<MyCards />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
