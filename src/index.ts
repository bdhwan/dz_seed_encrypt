import { CryptoUtil } from "./seed/CryptoUtil";

export function encrypt(key: string, iv: string, message: string) {
  const util = CryptoUtil.getInstance(key, iv);
  const result = util.encrypt(message);
  return result;
}

export function decrypt(key: string, iv: string, message: string) {
  const util = CryptoUtil.getInstance(key, iv);
  const result = util.decrypt(message);
  return result;
}

//export CryptoUtil

export { CryptoUtil };

// 1. 평문 : SEED테스트 / 암호화문 : yvTjxI4Ao4/7U7JLLS+7IA==
// 2. 평문 : SEED / 암호화문 : xj5LmctGf5tqftJC8bBMmA==
// 3. 평문 : 12345678910 / 암호화문 : bxrDove3qjmE088tdY0yZQ==
// 4. 평문 : 2021년5월25일 / 암호화문 : wD2HoXt7xISqV0VTjdEdi6e7ugAHnBa/sNGrezSsZ0s=
// 5. 평문 : 더즌 / 암호화문 : Lr6hT8o4YndaoC2bGNBGYw==
// 6. 평문 : DOZN / 암호화문 : dRYHUp7ztvCbSIKYYWDHcw==
// 7. 평문 : afdlkspq / 암호화문 : JmpcoVETYVAhDBrbzE3nmw==
// 8. 평문 : 서울시서초구 / 암호화문 : eT3m6shHxFEYqXXd+YKsAvbLu/6IuIKpkcbin7ZjYXI=
// 9. 평문 : 암호화SEED128 / 암호화문 : H2NPSCTsoN4jF0wlojEjEXu8VogGgadXucCTYsc92b4=
// 10. 평문 : SeedTest0525 / 암호화문 : ZrbTqilUTLBITnS5lnyCaA==
