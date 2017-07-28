((window, document) => {

  const bootstrap = Array.from(document.getElementsByTagName('script')).filter((s) => {
    return s.src.endsWith('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js');
  }).pop();
  const bootstrapInHead = bootstrap && bootstrap.parentElement.tagName === 'HEAD';
  const widgets = Array.from(document.querySelectorAll('.trustpilot-widget'));
  const liveWidgets = widgets.filter((w) => w.firstChild && w.firstChild.tagName === 'IFRAME');

  return {
    bootstrapFromTrustpilot: !!bootstrap,
    bootstrapInHead,
    numWidgets: widgets.length,
    numLiveWidgets: liveWidgets.length
  };

})(window, document);
