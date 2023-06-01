# InvidJS (Bleeding Edge)

[![CI - Run tests](https://github.com/InvidJS/InvidJS/actions/workflows/tests.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/tests.yml)
[![CI - Build docs](https://github.com/InvidJS/InvidJS/actions/workflows/bleeding-docs.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/bleeding-docs.yml)
[![CI - Publish](https://github.com/InvidJS/InvidJS/actions/workflows/bleeding-publish.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/bleeding-publish.yml)

An attempt to bring Invidious support to Node.js.

# Installation and usage

**ALERT!** This version may be unstable. Please use at your own risk.

Your Node.js version must be 16.9.0 or greater.

You can check your version by typing `node -v` in the terminal.

To install InvidJS, type `npm install @invidjs/invid-js-test` in your terminal.

After installing, insert the following in your code:

```js
import * as InvidJS from "@invidjs/invid-js-test" //TypeScript, ESM Node.js
const InvidJS = require("@invidjs/invid-js-test") //CSM Node.js
```

# Changes from the stock Invidious API
- Useless/broken endpoints, such as annotations and captions are not carried over. This might be reconsidered in the future.
- To reduce noise, only the most important data is fetched in the case of big objects.
- Some data is filled in for you and/or made humanly-readable where possible. Examples of this include mixes and formats with undefined containers.
- Minimal and basic versions of objects are available to be consistent with different outputs.
- Limit options are provided where they're not normally supported by the API.
- Some objects and outputs are combined, for example:
  - Video and Audio formats are a single object. 
  - formatStreams and adaptiveFormats are a single array.
  - Playlists and mixes are the same object, and fetched via the same function.

# Building from source
To build the package, clone this repository and execute `npm run build` in your terminal.

[Documentation](https://invidjs.github.io/docs-bleeding-edge/)
