import React, { useEffect, useState } from "react";
import packageJson from "../package.json";
global.appVersion = packageJson.version;
// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};
function CacheBuster({ children }) {
  const [isLoading, SetIsLoading] = useState(true);
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const refreshCacheAndReload = () => {
    console.log("Clearing cache and hard reloading...");
    if (caches) {
      // Service worker cache should be cleared with caches.delete()
      caches.keys().then(function (names) {
        for (let name of names) {
          console.log("names cache: ", name);
          caches.delete(name);
        }
      });
    }

    // delete browser cache and hard reload
    window.location.reload(true);
  };
  useEffect(() => {
    fetch("/meta.json", { cache: "no-cache" })
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion
        );
        if (shouldForceRefresh) {
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`
          );
          setIsLatestVersion(false);
          SetIsLoading(false);
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`
          );
          setIsLatestVersion(true);
          SetIsLoading(false);
        }
      });
  });
  return (
    <React.Fragment>
      {children({
        isLoading,
        isLatestVersion,
        refreshCacheAndReload,
      })}
    </React.Fragment>
  );
}

export default CacheBuster;
