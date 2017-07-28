((window, document) => {

  const bootstrap = Array.from(document.getElementsByTagName('script')).filter((s) => {
    return s.src.endsWith('//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js');
  }).pop();
  const bootstrapInHead = bootstrap && bootstrap.parentElement.tagName === 'HEAD';
  const widgets = Array.from(document.querySelectorAll('.trustpilot-widget'));
  const liveWidgets = widgets.filter((w) => w.firstChild && w.firstChild.tagName === 'IFRAME');
  const richSnippetsWidgets = widgets.filter((w) => w.dataset.schemaType === 'Organization');
  const productRichSnippetsWidgets = widgets.filter((w) => w.dataset.sku && w.dataset.name);

  const richSnippets = Array.from(document.getElementsByTagName('script')).filter((s) => {
    return s.type && s.type === 'application/ld+json';
  });

  const orgRichSnippet = richSnippets.filter((s) => {
    try {
      const snippet = JSON.parse(s.innerText);
      return snippet['@type'] === 'Organization' && snippet.aggregateRating;
    } catch (e) {
      console.debug(e);
    }
    return false;
  }).pop();

  const productRichSnippet = richSnippets.filter((s) => {
    try {
      const snippet = JSON.parse(s.innerText);
      return snippet['@type'] === 'Product' && snippet.review;
    } catch (e) {
      console.debug(e);
    }
    return false;
  }).pop();

  return {
    bootstrapFromTrustpilot: !!bootstrap,
    bootstrapInHead,
    numWidgets: widgets.length,
    numLiveWidgets: liveWidgets.length,
    numRichSnippetsWidgets: richSnippetsWidgets.length,
    numProductRichSnippetsWidgets: productRichSnippetsWidgets.length,
    orgRichSnippet: !!orgRichSnippet,
    productRichSnippet: !!productRichSnippet
  };

})(window, document);
