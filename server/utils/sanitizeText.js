const sanitizeText = (text) => {
  return text.replace(/[^a-z0-9]/gi, ""); // Removes all non-alphanumeric characters
};

export default sanitizeText;
