import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SignIn } from "./pages/Login";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";
import { HomeView } from "./pages/HomeView";
function App() {
  const currentUser = useSelector((state: any) => state.currentUser);

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          {!currentUser.logged ? (
            <Route path="/" element={<SignIn />}></Route>
          ) : (
            <Route path="" element={<HomeView />} />
          )}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
