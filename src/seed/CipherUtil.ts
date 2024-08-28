import { CuSEED } from "./CuSEED"; // Assuming CuSEED class is in the same directory and already converted to TypeScript

export function encodeUtf8(data: string): Int8Array {
  const uint8Array = new TextEncoder().encode(data);
  return Int8Array.from(
    uint8Array.map((byte) => (byte > 127 ? byte - 256 : byte))
  );
}

export class CipherUtil {
  private readonly SEED: number = 1;
  private cipherMode: number = 0;
  private encryptKey: number[] | null = null;
  private decryptKey: number[] | null = null;
  private iv: Int8Array;

  constructor(algorithm: string, key: Int8Array, iv: Int8Array) {
    this.iv = new Int8Array(iv.length);
    this.iv.set(iv);

    if (algorithm.toUpperCase() === "SEED") {
      this.cipherMode = this.SEED;
      this.encryptKey = CuSEED.generateWorkingKey(true, key);
      this.decryptKey = CuSEED.generateWorkingKey(false, key);
    }
  }

  public writePlainToCipher(plaintext: Int8Array): Int8Array | null {
    let ciphertext: Int8Array | null = null;

    switch (this.cipherMode) {
      case this.SEED:
        if (this.encryptKey) {
          ciphertext = CuSEED.doEncrypt(
            plaintext,
            this.encryptKey,
            this.iv,
            0,
            plaintext.length
          );
        }
        break;
      default:
        return null;
    }

    return ciphertext;
  }

  public readCipherToPlain(ciphertext: Int8Array): Int8Array | null {
    let plaintext: Int8Array | null = null;

    switch (this.cipherMode) {
      case this.SEED:
        if (this.decryptKey) {
          plaintext = CuSEED.doDecrypt(ciphertext, this.decryptKey, this.iv);
        }
        break;
      default:
        return null;
    }

    return plaintext;
  }
}
