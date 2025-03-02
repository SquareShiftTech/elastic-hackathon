import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { Login } from "./Components/Login/Login";

function App() {
  return (
    <div>
      <div>
        <Header />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div>Dashboard Page</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
