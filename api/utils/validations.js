
module.exports.isValidUrl = (url) => {
  try {
    new Url(url);
    return true;
  } catch (error) {
    return false
  }
}