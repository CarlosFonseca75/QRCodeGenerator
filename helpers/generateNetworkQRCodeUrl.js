/**
 * @function
 * @name generateNetworkQRCodeUrl
 * @description Generates the encoded URL for a QR code from network data.
 * @param {Object} networkInfo - The network information for which to generate the QR code.
 * @param {string} networkInfo.networkType - The type of the network (e.g. wpa).
 * @param {string} networkInfo.networkName - The name of the network.
 * @param {string} networkInfo.networkPassword - The password for the network.
 * @returns {string} The encoded URL for the QR code.
 */
module.exports = function generateNetworkQRCodeUrl(networkInfo) {
  try {
     const { networkType, networkName, networkPassword } = networkInfo;

     const networkContent = `WIFI:T:${networkType.toUpperCase()};S:${networkName};P:${networkPassword};`;

     const url = `https://2i07qgrgpl.execute-api.us-east-1.amazonaws.com/default/qrcode?content=${encodeURIComponent(
       networkContent
     )}`;

     return url;
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};
