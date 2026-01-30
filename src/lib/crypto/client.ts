import { base64ToBytes } from "../utils/base64";

const ALGORITHM = "AES-GCM";

async function keyFromPassword(password: string): Promise<CryptoKey> {
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  console.log(Buffer.from(hashBuffer).toString("hex"));

  const key = await window.crypto.subtle.importKey(
    "raw",
    hashBuffer,
    { name: ALGORITHM },
    false,
    ["decrypt"],
  );

  return key;
}

// See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#aes-gcm
export async function decrypt(
  payload: string,
  password: string,
): Promise<string | null> {
  const [ivBase64, encryptedBase64] = payload.split(":");
  if (!ivBase64 || !encryptedBase64) {
    return null;
  }

  console.log({ ivBase64, encryptedBase64 });

  const ivBytes = base64ToBytes(ivBase64);
  const encryptedBytes = base64ToBytes(encryptedBase64);

  const key = await keyFromPassword(password);

  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: ivBytes,
      },
      key,
      encryptedBytes,
    );

    const textDecoder = new TextDecoder();
    return textDecoder.decode(decryptedBuffer);

  } catch (e) {  // Decryption failed, probably due to wrong password
    console.error("Decryption failed:", e);
    return null;
  }
}