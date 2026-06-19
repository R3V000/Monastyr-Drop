(function () {
  const config = window.PATCH_NOTES_CONFIG || {};
  const patches = Array.isArray(config.patches) ? config.patches : [];
  const patchList = document.querySelector("#patch-list");
  const patchFrame = document.querySelector("#patch-frame");
  const patchTitle = document.querySelector("#patch-title");
  const patchStatus = document.querySelector("#patch-status");
  const directLink = document.querySelector("#patch-direct-link");
  const outdatedNote = document.querySelector("#outdated-patch-note");
  const outdatedPatchLabel = document.querySelector("#outdated-patch-label");
  const currentPatchLabel = document.querySelector("#current-patch-label");
  const currentPatchButton = document.querySelector("#current-patch-button");

  function getRequestedPatchId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("patch") || window.location.hash.replace(/^#/, "");
  }

  function findPatch(id) {
    return patches.find((patch) => patch.id === id);
  }

  function setShellArt(patch) {
    if (patch.backgroundImage) {
      document.documentElement.style.setProperty("--patch-bg", `url("${patch.backgroundImage}")`);
    }

    if (patch.panelImage) {
      document.documentElement.style.setProperty("--patch-panel", `url("${patch.panelImage}")`);
    }
  }

  function updateOutdatedNote(patch) {
    const currentPatch = findPatch(config.currentPatchId);
    const isOutdated = currentPatch && patch.id !== currentPatch.id;

    outdatedNote.hidden = !isOutdated;

    if (!isOutdated) {
      return;
    }

    outdatedPatchLabel.textContent = patch.label;
    currentPatchLabel.textContent = currentPatch.label;
    currentPatchButton.onclick = () => setActivePatch(currentPatch, false);
  }

  function setActivePatch(patch, replaceState) {
    if (!patch) {
      return;
    }

    patchFrame.src = patch.path;
    patchTitle.textContent = patch.title;
    directLink.href = patch.path;
    patchStatus.textContent = patch.id === config.currentPatchId ? "Aktualny patch" : "Archiwum";
    setShellArt(patch);
    updateOutdatedNote(patch);

    document.querySelectorAll("[data-patch-id]").forEach((item) => {
      item.classList.toggle("active", item.dataset.patchId === patch.id);
      item.toggleAttribute("aria-current", item.dataset.patchId === patch.id);
    });

    const nextUrl = `${window.location.pathname}?patch=${encodeURIComponent(patch.id)}`;
    if (replaceState) {
      window.history.replaceState({ patchId: patch.id }, "", nextUrl);
    } else {
      window.history.pushState({ patchId: patch.id }, "", nextUrl);
    }
  }

  function renderPatchList() {
    patchList.textContent = "";

    patches.forEach((patch) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.patchId = patch.id;
      button.className = "patch-list-item";
      button.innerHTML = `
        <span>${patch.label}</span>
        <strong>${patch.releasedAt}</strong>
      `;
      button.addEventListener("click", () => setActivePatch(patch, false));
      patchList.append(button);
    });
  }

  function init() {
    if (!patches.length) {
      patchTitle.textContent = "Brak patchy";
      return;
    }

    renderPatchList();

    const requestedPatch = findPatch(getRequestedPatchId());
    const currentPatch = findPatch(config.currentPatchId);
    setActivePatch(requestedPatch || currentPatch || patches[0], true);
  }

  window.addEventListener("popstate", () => {
    const requestedPatch = findPatch(getRequestedPatchId());
    setActivePatch(requestedPatch || findPatch(config.currentPatchId) || patches[0], true);
  });

  init();
})();
