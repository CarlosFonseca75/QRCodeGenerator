/**
 * @function
 * @name generateUrlQRCodeUrl
 * @description Generates the encoded URL for a QR code from a given URL.
 * @param {string} url - The URL for which to generate the QR code.
 * @returns {string} The encoded URL for the QR code.
 */
module.exports = function generateUrlQRCodeUrl(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const qrcodeUrl = `https://2i07qgrgpl.execute-api.us-east-1.amazonaws.com/default/qrcode?content=${encodedUrl}`;

    return qrcodeUrl;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
