import crypto from "crypto";

const password = process.argv[2];
if (!password) {
  console.error("Usage: pnpm gen-key <password>");
  process.exit(1);
}

const hash = crypto.createHash("sha256").update(password).digest("hex");

console.log("Encryption Key (SHA-256):");
console.log("----------------------------------------------------------------------------");
console.log(hash);
console.log("----------------------------------------------------------------------------");
console.log("Copy this string to the ADMIN_ENCRYPTION_KEY_HEX variable in your .env file.\n");