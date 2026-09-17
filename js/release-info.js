"use strict";

// AUTO-GENERATED RELEASE METADATA.

(() => {
  const release = Object.freeze({
    version: "2.0.1",
    commit: "80f01a64e77b4afae5f9f348f9fa015ab5fc7a9b",
    commitShort: "80f01a6",
    manifestSha256: "24a4ce5b19fc242ada4267f8223744ecbb9cc26cb45ef96b4ce93c9ef6ddcb3f"
  });

  function renderReleaseInfo() {
    const version = document.getElementById("appVersion");
    const commitGroup = document.getElementById("commitMeta");
    const commit = document.getElementById("appCommit");
    const hashGroup = document.getElementById("hashMeta");
    const hash = document.getElementById("appReleaseHash");

    if (version) version.textContent = `v${release.version}`;

    if (commitGroup) commitGroup.hidden = false;

    if (commit) {
      commit.textContent = release.commitShort;
      commit.title = release.commit;
    }

    if (hashGroup) hashGroup.hidden = false;

    if (hash) hash.textContent = release.manifestSha256;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderReleaseInfo, { once: true });
  } else {
    renderReleaseInfo();
  }
})();