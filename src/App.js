import { Routes, Route } from "react-router-dom";
// import { DataContextProvider } from "./context/DataContext";
import { Provider } from "mobx-react";
import DataStore from "./store/data";
import "./App.scss";
import MainPage from "./components/MainPage";
import Table from "./components/Table";
import TrainingPage from "./components/TrainingPage";
import NotFound from "./components/NotFound";

function App() {
  const store = {
    dataStore: new DataStore(),
  };

  return (
    <Provider {...store}>
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />}>
            <Route index element={<Table />} />
            <Route path="training" element={<TrainingPage/>} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
