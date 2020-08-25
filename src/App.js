import React from "react";
import "./App.css";
import { useClearCache } from "react-clear-cache";
function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  return (
    <div className="App">
      {!isLatestVersion && (
        <p>
          New update available
          <button
            onClick={(e) => {
              e.preventDefault();
              emptyCacheStorage();
            }}
          >
            Update version
          </button>
        </p>
      )}
      <header className="App-header">
        <h1>Automatic cache reset</h1>
        <p>Hello people</p>
      </header>
    </div>
  );
}

export default App;
