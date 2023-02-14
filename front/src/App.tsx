import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import Todo from "./pages/Todo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/singin" element={<Login />} />
          {/* <Route path="/" element={<Todo />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;