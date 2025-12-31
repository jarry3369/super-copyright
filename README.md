# super-copyright

lightweight Web Component for automatic copyright notices.

[![npm version](https://img.shields.io/npm/v/super-copyright.svg)](https://www.npmjs.com/package/super-copyright)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/super-copyright@latest/dist/super-copyright.min.js"></script>
```

For production, pin to a specific version:

```html
<script src="https://cdn.jsdelivr.net/npm/super-copyright@0.1.0/dist/super-copyright.min.js"></script>
```

### NPM

```bash
npm install super-copyright
```

```javascript
import 'super-copyright'
```

## Usage

```html
<super-copyright holder="Acme Corp" />
<!-- Output: © 2025 Acme Corp. -->

<super-copyright since="1930" holder="Acme Corp" statement="all" />
<!-- Output: © 1930-2025 Acme Corp. All rights reserved. -->
```

## Attributes

| Attribute   | Type   | Default   | Description                              |
| ----------- | ------ | --------- | ---------------------------------------- |
| `holder`    | string | `""`      | Copyright holder name                    |
| `since`     | number | -         | Start year (auto-range if < current year)|
| `notation`  | string | `"symbol"`| `symbol` (©), `ascii` ((c)), `text`, `none` |
| `separator` | string | `"-"`     | Year range separator                     |
| `statement` | string | `"none"`  | `all`, `some`, `none` (rights reserved)  |

## Examples

### Basic

```html
<super-copyright holder="John Doe" />
<!-- © 2025 John Doe. -->
```

### With Year Range

```html
<super-copyright since="2020" holder="Acme Corp" />
<!-- © 2020-2025 Acme Corp. -->
```

### Full Options

```html
<super-copyright
  since="1930"
  holder="Acme Corp"
  notation="ascii"
  separator="~"
  statement="all"
/>
<!-- (c) 1930~2025 Acme Corp. All rights reserved. -->
```

### Creative Commons Style

```html
<super-copyright holder="Totally Legit Business Co." statement="some" />
<!-- © 2025 Totally Legit Business Co. Some rights reserved. -->
```

## License

MIT © jarry3369
