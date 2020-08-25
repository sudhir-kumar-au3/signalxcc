import React from "react";
import "./App.css";
import CacheBuster from "./CacheBuster";
function App() {
  return (
    <CacheBuster>
      {({ isLoading, isLatestVersion, refreshCacheAndReload }) => {
        if (isLoading) return null;
        if (!isLoading && !isLatestVersion) {
          refreshCacheAndReload();
        }

        return (
          <div className="App">
            <header className="App-header">
              <h1>Cache Busting - Example</h1>
              <p>
                Bundle version - <code>v{global.appVersion}</code>
              </p>
            </header>
          </div>
        );
      }}
    </CacheBuster>
  );
}

export default App;
