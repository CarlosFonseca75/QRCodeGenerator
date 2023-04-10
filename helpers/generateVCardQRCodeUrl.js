/**
 * @function
 * @name generateVCardQRCodeUrl
 * @description Generates the encoded URL for a QR code from user data.
 * @param {Object} userData - The user data from which to generate the QR code.
 * @param {string} userData.firstName - The user's first name.
 * @param {string} userData.lastName - The user's last name.
 * @param {Array<string>} userData.emails - An array of email addresses.
 * @param {Array<Object>} userData.phoneNumbers - An array of objects containing phone number and phone type data.
 * @param {string} userData.phoneNumbers.number - The phone number.
 * @param {string} userData.phoneNumbers.type - The phone type (e.g. "work").
 * @returns {string} The encoded URL for the QR code.
 */
module.exports = function generateVCardQRCodeUrl(userData) {
  try {
    const { firstName, lastName, emails, phoneNumbers } = userData;

    // Content.
    let vCardContent = `BEGIN:VCARD\nVERSION:2.1\nN:${firstName}`;

    // Adding lastname.
    if (lastName) vCardContent += `;${lastName}\n`;
    else vCardContent += `\n`;

    // Adding emails.
    const vCardEmails = emails.map((email) => `EMAIL:${email}`);
    vCardContent += vCardEmails.join("\n");

    // Add extra line break.
    vCardContent += `\n`;

    // Adding phone numbers.
    const vCardPhoneNumbers = phoneNumbers.map(
      (phone) => `TEL;${phone.type.toUpperCase()}:${phone.number}`
    );
    vCardContent += vCardPhoneNumbers.join("\n");

    // Adding end.
    vCardContent += "\nEND:VCARD";

    const url = `https://2i07qgrgpl.execute-api.us-east-1.amazonaws.com/default/qrcode?content=${encodeURIComponent(
      vCardContent
    )}`;

    return url;
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};
