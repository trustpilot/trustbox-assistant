((window, document) => {

  window.TrustBoxChecker = window.TrustBoxChecker || {
    queryWidgets: () => {
      return Array.from(document.querySelectorAll('.trustpilot-widget'));
    }
  };

})(window, document);
