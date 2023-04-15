# InvidJS

[![CI - Run tests](https://github.com/InvidJS/InvidJS/actions/workflows/tests.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/tests.yml)
[![CI - Build docs](https://github.com/InvidJS/InvidJS/actions/workflows/docs.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/docs.yml)
[![CI - Publish](https://github.com/InvidJS/InvidJS/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/InvidJS/InvidJS/actions/workflows/npm-publish.yml)

An attempt to bring Invidious support to Node.js.

# Installation and usage

To install InvidJS, type `npm install @invidjs/invid-js` in your terminal.

To use it in your own project, type the following:

```js
import * as InvidJS from "@invidjs/invid-js" //TypeScript, ESM Node.js
const InvidJS = require("@invidjs/invid-js") //CSM Node.js
```

# Changes from the stock Invidious API
- Useless/broken endpoints, such as annotations and captions are not carried over. This might be reconsidered in the future.
- To reduce noise, only the most important data is fetched in the case of big objects.
- Some unavailable data is filled in for you where possible. Examples of this include mixes and formats with undefined containers.
- Minimal and basic versions of objects are available to be consistent with different outputs.
- Limit options are provided where they're not normally supported by the API.
- Some objects and outputs are combined, for example:
  - Video and Audio formats are a single object. 
  - formatStreams and adaptiveFormats are a single array.
  - Playlists and mixes are the same object, and fetched via the same function.

# Building from source
To build the package, clone this repository and execute `npm run build` in your terminal.

[Documentation](https://invidjs.github.io/docs/modules.html)
