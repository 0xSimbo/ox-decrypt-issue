import { aesKey, privateKey, cachedEncrypted } from "./secrets";
import { AesGcm, Bytes, Hex } from "ox";

async function works() {
  const key = await AesGcm.getKey({ password: aesKey });
  const encrypted = await AesGcm.encrypt(privateKey, key);
  console.log("encrypted", encrypted);
  const decrpyted = await AesGcm.decrypt(encrypted, key);
  if (decrpyted !== privateKey) {
    throw new Error("Decryption failed");
  }
  console.log(`Success!`);
}

async function doesNotWork() {
  const key = await AesGcm.getKey({ password: aesKey });
  //Try decrypting just the cachedEncrypted
  const decrypted = AesGcm.decrypt(cachedEncrypted, key);
  //Will Error
}
//Now

async function main() {
  await works();
  await doesNotWork();
}

main();
