# InvidJS

[![npm version](https://badge.fury.io/js/@invidjs%2Finvid-js.svg)](https://badge.fury.io/js/@invidjs%2Finvid-js)
![npm](https://img.shields.io/npm/dt/%40invidjs/invid-js)

An attempt to bring Invidious support to Node.js.

# Installation and usage

Your Node.js version must be 16.9.0 or greater.

You can check your version by typing `node -v` in the terminal.

To install InvidJS, type `npm install @invidjs/invid-js` in your terminal.

After installing, insert the following in your code:

```js
import * as InvidJS from "@invidjs/invid-js"
```

# Changes from the stock Invidious API
- Useless or broken endpoints are not carried over. Previously working endpoints are marked as deprecated.
- Only the most important data is fetched for big objects.
- Some data is filled in for you and/or made humanly-readable where possible.
- Minimal and basic versions of objects are available to be consistent with different outputs.
- Limit options are provided where they're not normally supported by the API.
- Some objects and outputs are combined, for example:
  - Video and Audio formats are a single object. 
  - formatStreams and adaptiveFormats are a single array.
  - Playlists and mixes are the same object, and fetched via the same function.

# Building from source
To build the package, clone this repository and execute `npm run build` in your terminal.

[Documentation](https://invidjs.js.org/)
