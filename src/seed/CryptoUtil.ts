import { encodeUtf8 } from "./CipherUtil";
import { SecureUtil } from "./SecurityUtil"; // Assuming SecureUtil is in the same directory

export class CryptoUtil {
  private static instance: CryptoUtil | null = null;
  private secureUtil: SecureUtil | null = null;

  private constructor() {}

  public static getInstance(key: string, iv: string): CryptoUtil {
    if (!CryptoUtil.instance) {
      CryptoUtil.instance = new CryptoUtil();

      try {
        CryptoUtil.instance.secureUtil = new SecureUtil(
          "SEED",
          encodeUtf8(key),
          encodeUtf8(iv)
        );
      } catch (error) {
        throw new Error(error as string);
      }
    }
    return CryptoUtil.instance;
  }

  toSignedByteArray(uint8Array: Uint8Array): Int8Array {
    return Int8Array.from(
      uint8Array.map((byte) => (byte > 127 ? byte - 256 : byte))
    );
  }

  public encrypt(data: string): string {
    let encryptedData = "";
    const utf8Data = encodeUtf8(data);
    encryptedData = this.secureUtil?.doEncryptEncode(utf8Data) || "";
    return encryptedData;
  }

  public decrypt(data: string): string {
    let decryptedData = "";
    if (data) {
      try {
        const decodedData = this.secureUtil?.doDecodeDecrypt(data);
        if (decodedData) {
          decryptedData = new TextDecoder("utf-8").decode(decodedData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return decryptedData;
  }

  public encryptBytes(
    data: Int8Array,
    offset: number,
    length: number
  ): Int8Array | null {
    const inputData = data.slice(offset, offset + length);
    try {
      return this.secureUtil?.doEncrypt(inputData) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public decryptBytes(
    data: Int8Array,
    offset: number,
    length: number
  ): Int8Array {
    const inputData = data.slice(offset, offset + length);
    try {
      const decryptedData = this.secureUtil?.doDecrypt(inputData);
      return decryptedData || encodeUtf8("");
    } catch (error) {
      console.error(error);
      return encodeUtf8("");
    }
  }
}
