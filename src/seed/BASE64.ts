export class BASE64 {
  private static a: number[] = [
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90, // A-Z
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122, // a-z
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57, // 0-9
    43,
    47 // + /
  ];

  private static b: number[] = new Array(128).fill(0);

  static {
    for (let i = 65; i <= 90; i++) {
      this.b[i] = i - 65;
    }

    for (let i = 97; i <= 122; i++) {
      this.b[i] = i - 97 + 26;
    }

    for (let i = 48; i <= 57; i++) {
      this.b[i] = i - 48 + 52;
    }

    this.b[43] = 62; // +
    this.b[47] = 63; // /
  }

  public static Encode(data: Int8Array): Int8Array {
    const base64Chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const a = new Int8Array(base64Chars.length);
    for (let i = 0; i < base64Chars.length; i++) {
      a[i] = base64Chars.charCodeAt(i);
    }

    let outputLength = Math.ceil(data.length / 3) * 4;
    let output = new Int8Array(outputLength);

    let inputIndex = 0;
    let outputIndex = 0;

    while (inputIndex < data.length - 2) {
      let byte1 = data[inputIndex++] & 0xff;
      let byte2 = data[inputIndex++] & 0xff;
      let byte3 = data[inputIndex++] & 0xff;

      output[outputIndex++] = a[byte1 >> 2];
      output[outputIndex++] = a[((byte1 & 3) << 4) | (byte2 >> 4)];
      output[outputIndex++] = a[((byte2 & 15) << 2) | (byte3 >> 6)];
      output[outputIndex++] = a[byte3 & 63];
    }

    if (inputIndex < data.length) {
      let byte1 = data[inputIndex++] & 0xff;
      output[outputIndex++] = a[byte1 >> 2];

      if (inputIndex < data.length) {
        let byte2 = data[inputIndex] & 0xff;
        output[outputIndex++] = a[((byte1 & 3) << 4) | (byte2 >> 4)];
        output[outputIndex++] = a[(byte2 & 15) << 2];
        output[outputIndex++] = 61; // '=' padding
      } else {
        output[outputIndex++] = a[(byte1 & 3) << 4];
        output[outputIndex++] = 61; // '=' padding
        output[outputIndex++] = 61; // '=' padding
      }
    }

    return output;
  }

  public static Decode(data: Int8Array): Int8Array {
    let padding =
      data[data.length - 1] === 61 ? (data[data.length - 2] === 61 ? 2 : 1) : 0;
    let outputLength = Math.floor(data.length / 4) * 3 - padding;
    let output = new Int8Array(outputLength);

    let inputIndex = 0;
    let outputIndex = 0;

    while (inputIndex < data.length - 4) {
      let byte1 = this.b[data[inputIndex++]];
      let byte2 = this.b[data[inputIndex++]];
      let byte3 = this.b[data[inputIndex++]];
      let byte4 = this.b[data[inputIndex++]];

      output[outputIndex++] = (byte1 << 2) | (byte2 >> 4);
      output[outputIndex++] = ((byte2 & 15) << 4) | (byte3 >> 2);
      output[outputIndex++] = ((byte3 & 3) << 6) | byte4;
    }

    if (padding === 1) {
      let byte1 = this.b[data[inputIndex++]];
      let byte2 = this.b[data[inputIndex++]];
      let byte3 = this.b[data[inputIndex++]];

      output[outputIndex++] = (byte1 << 2) | (byte2 >> 4);
      output[outputIndex++] = ((byte2 & 15) << 4) | (byte3 >> 2);
    } else if (padding === 2) {
      let byte1 = this.b[data[inputIndex++]];
      let byte2 = this.b[data[inputIndex++]];

      output[outputIndex++] = (byte1 << 2) | (byte2 >> 4);
    } else {
      let byte1 = this.b[data[inputIndex++]];
      let byte2 = this.b[data[inputIndex++]];
      let byte3 = this.b[data[inputIndex++]];
      let byte4 = this.b[data[inputIndex++]];

      output[outputIndex++] = (byte1 << 2) | (byte2 >> 4);
      output[outputIndex++] = ((byte2 & 15) << 4) | (byte3 >> 2);
      output[outputIndex++] = ((byte3 & 3) << 6) | byte4;
    }

    return output;
  }
}
