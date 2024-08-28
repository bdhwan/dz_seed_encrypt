import { CryptoUtil } from "../src";

test("encrypt and decrypt", () => {
  const util = CryptoUtil.getInstance(
    "g657a924f4db69f746009f462c0f1a21",
    "8a9acfb14bf38a3b"
  );

  const testCases = [
    { plaintext: "SEED테스트", ciphertext: "ozSlboBZ0hqdBTG18SXPrg==" },
    { plaintext: "SEED", ciphertext: "bTsbEupSl9znD4bwuLWPKQ==" },
    { plaintext: "12345678910", ciphertext: "nspRd/qYFpjoySf8A6pQfA==" },
    {
      plaintext: "2024년8월28일",
      ciphertext: "WMN+MGMH8B7sG9H+/3Kf32h0whRABwbP2/apR0uxfes="
    },
    { plaintext: "기프티", ciphertext: "ObV1g1NXEPAm9CFcXUXROA==" },
    { plaintext: "Giftistar", ciphertext: "Ldf4bIjjP8OeGzOvYmvx8w==" },
    { plaintext: "afdlkspq", ciphertext: "xPKp3AhymSE4XDRJT74IZQ==" },
    {
      plaintext: "서울시도봉구",
      ciphertext: "Q/lC5BrSN0G/QY66cQD4qKNVvlPo38l+MatJoCxYm80="
    },
    {
      plaintext: "암호화SEED128",
      ciphertext: "dhTeicRm/jgp6uMXkfcMc0TtrQ7aELYyM39CT9TB2Xc="
    },
    { plaintext: "SeedTTTT", ciphertext: "wYITptFHYg5DEexb3fkp4g==" }
  ];

  testCases.forEach(({ plaintext, ciphertext }) => {
    const enc = util.encrypt(plaintext);
    console.log(plaintext, enc);
    expect(enc).toBe(ciphertext);

    const dec = util.decrypt(enc);
    console.log(dec);
    expect(dec).toBe(plaintext);
  });
});
