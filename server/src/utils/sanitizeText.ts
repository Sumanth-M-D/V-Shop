const NON_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

function sanitizeText(text: string): string {
  return text.replace(NON_ALPHANUMERIC_REGEX, "");
}

export default sanitizeText;
