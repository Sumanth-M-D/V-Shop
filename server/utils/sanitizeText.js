const sanitizeText = (text) => {
  return text.replace(/[^a-z0-9]/gi, "");
};

export default sanitizeText;
