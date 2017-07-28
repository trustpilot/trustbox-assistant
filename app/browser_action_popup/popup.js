const contentScriptCallback = (results) => {
  const result = results.pop();
  if (!result) {
    return;
  }

  try {
    const boostrapCheck = document.getElementById('bootstrapFromTrustpilot');
    boostrapCheck.innerHTML = result.bootstrapFromTrustpilot ? '✅' : '❌';

    const inHeadCheck = document.getElementById('bootstrapInHead');
    inHeadCheck.innerHTML = result.bootstrapInHead ? '✅' : '❌';

    const widgetStats = document.getElementById('widgetStats');
    widgetStats.innerHTML = `${result.numLiveWidgets} / ${result.numWidgets}`;
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
