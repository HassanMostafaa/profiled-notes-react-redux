import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { HomeView } from "./pages/HomeView";
import { Nav } from "./components/Nav";
import { NotFound } from "./pages/NotFound";
import { Account } from "./pages/Account";
import { useEffect } from "react";
import { loginCurrentUser } from "./redux/currentUser/currentUserSlice";

function App() {
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();

  // User Remember Me function up to App Component for refreshing in different URLs other that "/"
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const autoLog = localStorage.getItem("autoLog");
    if (storedEmail !== null && storedPassword !== null && autoLog === "true") {
      dispatch(
        loginCurrentUser({
          email: storedEmail,
          password: storedPassword,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="App container">
      <BrowserRouter>
        <Nav />
        <Routes>
          {!currentUser.logged ? (
            <>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomeView />} />
              <Route path="/account" element={<Account />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
