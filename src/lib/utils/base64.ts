// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function base64ToBytes(base64: string) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function bytesToBase64(bytes: Uint8Array) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

// Quick polyfill since Firefox and Opera do not yet support isWellFormed().
// encodeURIComponent() throws an error for lone surrogates, which is essentially the same.
function isWellFormed(str: string) {
  try {
    encodeURIComponent(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function encode(str: string) {
  if (isWellFormed(str)) {
    const encoded = bytesToBase64(new TextEncoder().encode(str));
    return encoded;
  } else {
    return null;
  }
}

export function decode(encoded: string) {
  const str = new TextDecoder().decode(base64ToBytes(encoded));
  if (isWellFormed(str)) {
    return str;
  } else {
    return null;
  }
}
