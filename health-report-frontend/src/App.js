import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { Login } from "./Components/Login/Login";
import { HomePage } from "./Components/HomePage/HomePage";
import { VideoPage } from "./Components/VideoPage/VideoPage";

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
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/video/:id"
              element={
                <PrivateRoute>
                  <VideoPage />
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
