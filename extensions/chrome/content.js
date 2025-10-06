(() => {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('textarea, [contenteditable="true"]').forEach((node) => {
      if (node.dataset.utmGuardBound) return;
      node.dataset.utmGuardBound = "true";
      node.addEventListener("blur", () => {
        const text = node.value ?? node.innerText;
        const bareUrl = /https?:\/\/[^\s]+/.exec(text ?? "");
        if (bareUrl) {
          chrome.runtime.sendMessage({ type: "UTM_GUARD_DETECT", url: bareUrl[0] });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
