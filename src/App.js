import React from "react";
import "./App.css";
import CacheBuster from "./CacheBuster";
function App() {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => (
        <React.Fragment>
          {!loading && !isLatestVersion ? (
            <button onClick={() => refreshCacheAndReload()}></button>
          ) : (
            <div className="App">
              <header className="App-header">
                <h1>Cache Clear - Example</h1>
                <p>
                  Bundle version - <code>v{global.appVersion}</code>
                </p>
              </header>
            </div>
          )}
        </React.Fragment>
      )}
    </CacheBuster>
  );
}

export default App;
