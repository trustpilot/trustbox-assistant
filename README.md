# widgets-browserassistant
A helpful browser extension for troubleshooting TrustBoxes

![Check your TrustBox integration in one click](/screenshots/Firefox.png?raw=true "Check your TrustBox integration in one click")

## Development

Do the obligatory `npm install` or `yarn`, and then:

```
npm run watch
```

This will run `web-ext` in watch mode, which should spin up a vanilla instance of Firefox with the extension ([more info](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)).

You can also run the extension in Chrome by visiting `chrome://extensions/`, ticking the "Developer mode" checkbox at the top, and then click on "Load unpacked extension...". Make sure to select the `app` directory from within this repo.
