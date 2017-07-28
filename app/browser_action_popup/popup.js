const contentScriptCallback = (results) => {
  const result = results.pop();
  if (!result) {
    return;
  }

  try {
    const renderBoolean = (value) => {
      return value ? '✅' : '❌';
    };

    const boostrapCheck = document.getElementById('bootstrapFromTrustpilot');
    boostrapCheck.innerHTML = renderBoolean(result.bootstrapFromTrustpilot);

    const inHeadCheck = document.getElementById('bootstrapInHead');
    inHeadCheck.innerHTML = renderBoolean(result.bootstrapInHead);

    const widgetStats = document.getElementById('widgetStats');
    widgetStats.innerHTML = `${result.numLiveWidgets} / ${result.numWidgets}`;

    const richSnippetsWidgets = document.getElementById('numRichSnippetsWidgets');
    richSnippetsWidgets.innerHTML = result.numRichSnippetsWidgets;

    const richSnippets = document.getElementById('richSnippets');
    richSnippets.innerHTML = result.numRichSnippetsWidgets ? renderBoolean(result.orgRichSnippet) : 'N/A';

    const productRichSnippetsWidgets = document.getElementById('numProductRichSnippetsWidgets');
    productRichSnippetsWidgets.innerHTML = result.numProductRichSnippetsWidgets;

    const productRichSnippets = document.getElementById('productRichSnippets');
    productRichSnippets.innerHTML =
      result.numProductRichSnippetsWidgets ? renderBoolean(result.productRichSnippet) : 'N/A';

  } catch (e) {
    console.debug(e);
  }
};

const scriptParams = {
  file: '/content_scripts/trustbox-checker.js'
};

if (typeof chrome !== 'undefined') {
  chrome.tabs.executeScript(scriptParams, contentScriptCallback);
} else {
  browser.tabs.executeScript(scriptParams).then(contentScriptCallback);
}
