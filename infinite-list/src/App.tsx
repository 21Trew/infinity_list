// src/App.tsx
import React from "react";
import RepoList from "./components/RepoList";
import './index.css'; // Подключение стилей

const App: React.FC = () => {
  return (
    // <div className="App">
      <RepoList />
    // </div>
  );
};

export default App;