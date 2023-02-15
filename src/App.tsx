import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import AuthHoc from "./components/AuthHoc";

function App() {
  const AuthHomePage = AuthHoc(Todo);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<AuthHomePage />} />
          <Route path="/todo" element={<AuthHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
