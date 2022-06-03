import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignIn } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { HomeView } from "./pages/HomeView";
import { Nav } from "./components/Nav";
import { NotFound } from "./pages/NotFound";

function App() {
  const currentUser = useSelector((state: any) => state.currentUser);

  return (
    <div className="App container">
      <BrowserRouter>
        {" "}
        <Nav />
        <Routes>
          {!currentUser.logged ? (
            <Route path="/" element={<SignIn />}></Route>
          ) : (
            <Route path="" element={<HomeView />} />
          )}

          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
