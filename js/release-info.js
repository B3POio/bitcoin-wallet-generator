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
    version: "2.0.2",
    commit: "9b51857d776a72308a2982249a5a2114457fe613",
    commitShort: "9b51857",
    manifestSha256: "9db4361e04598f80bcb2ad6ff3b85ba256fc487040a3b80de1cf61e852ef2ec2"
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
