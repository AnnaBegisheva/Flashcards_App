import { Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext";
import "./App.scss";
import MainPage from "./components/MainPage";
import Table from "./components/Table";
import TrainingPage from "./components/TrainingPage";
import Vocabulary from "./components/Vocabulary";
import NotFound from "./components/NotFound";

function App() {
  return (
    <DataContextProvider>
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />}>
            <Route index element={<Table />} />
            <Route path="training" element={<TrainingPage/>} />
            <Route path="vocabulary" element={<Vocabulary />} />
          </Route>
        </Routes>
      </div>
    </DataContextProvider>
  );
}

export default App;
