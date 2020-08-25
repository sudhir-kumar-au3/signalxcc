import React from "react";
import "./App.css";
import { useClearCache } from "react-clear-cache";
function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  return (
    <div className="App">
      {!isLatestVersion && (
        <p>
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
        <h1>Automatic cache reset - Example</h1>
        <p>Bundle version</p>
      </header>
    </div>
  );
}

export default App;
