# trustbox-assistant

Browser extension to troubleshoot TrustBoxes.

TrustBoxes are Trustpilot's widgets - stand-alone applications that show customer reviews on your website.

![Check your TrustBox integration in one click](/screenshots/Firefox.png?raw=true 'Check your TrustBox integration in one click')

## Download

The extension is available for Chrome and Firefox:

- [Chrome Web Store](https://chrome.google.com/webstore/detail/trustbox-assistant/aofjkdnekcfcnijpaickcjlacdoipkop/)
- [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/trustpilot-trustbox-assistant/)

## Development

Do the obligatory `npm install` or `yarn`, and then:

### Chrome

You can run the extension in Chrome by visiting `chrome://extensions/`, ticking the "Developer mode" checkbox at the top, and then click on "Load unpacked extension...". Make sure to select the `app` directory from within this repo.

### Firefox

You can install `web-ext` (this is no longer included as a dependency in this repo in order to pass `yarn audit` (https://www.npmjs.com/advisories/663). However, it is perfectly safe to use for local development)

```
npm i -g web-ext
npm run web-ext-watch
```

This will run `web-ext` in watch mode, which should spin up a vanilla instance of Firefox with the extension ([more info](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)).
