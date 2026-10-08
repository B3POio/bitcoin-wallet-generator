"use strict";

// AUTO-GENERATED RELEASE METADATA.

/*
 * IMPORTANT RELEASE ORDER:
 *
 * Update this file only AFTER the release changes have been merged into main
 * and the final release checksums / manifest hash have been generated from
 * that exact main commit.
 *
 * Do not merge additional changes into main after generating these values.
 * Any change to the release files will alter the hashes and require the
 * release integrity data to be generated again.
 */

(() => {
  const release = Object.freeze({
    version: "2.0.3",
    commit: "ff1ed0c67a13c8460dd601f8919c0561066842b8",
    commitShort: "ff1ed0c",
    manifestSha256: "dcf293dc899ae7bd2d521fd3fb90833f5835520b83766a61492d15d440796b9e"
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
