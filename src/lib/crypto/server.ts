import { env } from "@/env";
import crypto from "crypto";
import { bytesToBase64 } from "../utils/base64";

const ALGORITHM = "AES-GCM";
const KEY_HEX = env.ADMIN_ENCRYPTION_KEY_HEX;

async function keyFromHex(hex: string): Promise<CryptoKey> {
  const keyBytes = Buffer.from(hex, "hex");
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: ALGORITHM },
    false,
    ["encrypt"],
  );
}

const getEncryptionKey = (() => {
  let keyPromise: Promise<CryptoKey> | null = null;
  return () => {
    if (!keyPromise) {
      keyPromise = keyFromHex(KEY_HEX);
    }
    return keyPromise;
  };
})();

// See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2
export async function encrypt(plainText: string): Promise<string> {
  const textEncoder = new TextEncoder();
  const encodedText = textEncoder.encode(plainText);

  const iv = crypto.randomBytes(12);
  const ivBytes = new Uint8Array(iv);

  const key = await getEncryptionKey();
  const encryptedText = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv: ivBytes },
    key,
    encodedText,
  )
  const encryptedBytes = new Uint8Array(encryptedText);

  const ivBase64 = bytesToBase64(ivBytes);
  const encryptedBase64 = bytesToBase64(encryptedBytes);

  console.log({ ivBase64, encryptedBase64 });

  return ivBase64 + ":" + encryptedBase64;
}
