# dz-seed-encrypt

## Installation

```
npm install dz-seed-encrypt
```

## Usage

You can use it in the following way.

```ts
import { CryptoUtil } from "dz-seed-encrypt";
const util = CryptoUtil.getInstance(
  "g657a924f4db69f746009f462c0f1a21",
  "8a9acfb14bf38a3b"
);
const enc = util.encrypt("SEED테스트");
console.log(enc);

const dec = util.decrypt(enc);
console.log(dec);
```
