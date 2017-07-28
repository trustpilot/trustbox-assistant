browser.tabs.executeScript({
  file: '/app/trustbox-checker.js'
}).then((results) => {
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

});
