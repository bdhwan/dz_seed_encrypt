import { CipherUtil, encodeUtf8 } from "./CipherUtil"; // Assuming CipherUtil is in the same directory
import { BASE64 } from "./BASE64"; // Assuming BASE64 utility is implemented

export class SecureUtil {
  private cipherUtil: CipherUtil | null = null;
  private key: Int8Array | null = null;
  private iv: Int8Array | null = null;
  private algorithm: string;
  private defaultKey: Int8Array = new Int8Array([
    -114, 9, -112, 6, -39, -115, 96, 1, 32, -18, -127, 26, -3, -3, -3, -3
  ]);
  private defaultIv: Int8Array = new Int8Array([
    -55, -87, -27, -58, -84, 42, -97, -100, -53, 13, -30, -91, -3, -3, -3, -3
  ]);

  constructor(algorithm: string, key?: Int8Array, iv?: Int8Array) {
    this.algorithm = algorithm;
    this.key = key || this.defaultKey;
    this.iv = iv || this.defaultIv;
    this.cipherUtil = new CipherUtil(this.algorithm, this.key, this.iv);
  }

  public doEncryptEncode(data: Int8Array): string | null {
    try {
      const encryptedData = this.doEncrypt(data);

      if (encryptedData !== null) {
        const encodedData = this.doEncode(encryptedData);

        if (encodedData !== null) {
          return new TextDecoder().decode(encodedData);
        }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public doEncryptEncodeUtf8(data: Int8Array): string | null {
    try {
      const encryptedData = this.doEncrypt(data);
      if (encryptedData !== null) {
        const encodedData = this.doEncode(encryptedData);
        if (encodedData !== null) {
          return new TextDecoder().decode(encodedData);
        }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  public doDecodeDecrypt(data: string): Int8Array | null {
    try {
      const decodedData = this.doDecode(data);
      if (decodedData !== null) {
        return this.doDecrypt(decodedData);
      }
    } catch (error) {
      console.error(`[SDBAPI ERROR] : ${error}`);
    }
    return null;
  }

  public doEncrypt(data: Int8Array): Int8Array | null {
    try {
      return this.cipherUtil?.writePlainToCipher(data) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public doDecrypt(data: Int8Array): Int8Array | null {
    try {
      return this.cipherUtil?.readCipherToPlain(data) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public doEncode(data: Int8Array): Int8Array | null {
    try {
      return BASE64.Encode(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public doDecode(data: string): Int8Array | null {
    try {
      const encodedData = encodeUtf8(data);
      return BASE64.Decode(encodedData);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public doDecodeWithCharset(data: string, charset: string): Int8Array | null {
    try {
      const encodedData = encodeUtf8(data);
      return BASE64.Decode(encodedData);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public doDecodeBytes(data: Int8Array): Int8Array | null {
    try {
      return BASE64.Decode(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
