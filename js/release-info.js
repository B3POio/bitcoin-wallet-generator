"use strict";

(() => {
  const release = Object.freeze({
    version: "2.0.0",
    commit: "",
    manifestSha256: ""
  });

  function renderReleaseInfo() {
    const version = document.getElementById("appVersion");
    const commitGroup = document.getElementById("commitMeta");
    const commit = document.getElementById("appCommit");
    const hashGroup = document.getElementById("hashMeta");
    const hash = document.getElementById("appReleaseHash");

    if (version) {
      version.textContent = `v${release.version}`;
    }

    if (commitGroup) {
      commitGroup.hidden = !release.commit;
    }

    if (commit && release.commit) {
      commit.textContent = release.commit.slice(0, 7);
      commit.title = release.commit;
    }

    if (hashGroup) {
      hashGroup.hidden = !release.manifestSha256;
    }

    if (hash && release.manifestSha256) {
      hash.textContent = release.manifestSha256;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderReleaseInfo, {
      once: true
    });
  } else {
    renderReleaseInfo();
  }
})();