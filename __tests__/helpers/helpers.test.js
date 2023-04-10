// Helpers.
import generateUrlQRCodeUrl from "@helpers/generateUrlQRCodeUrl";
import generateWifiQRCodeUrl from "@helpers/generateWifiQRCodeUrl";
import generateVCardQRCodeUrl from "@helpers/generateVCardQRCodeUrl";

// Base URL.
const baseUrl =
  "https://2i07qgrgpl.execute-api.us-east-1.amazonaws.com/default/qrcode?content=";

/**
 * @function
 * @name getExpectedUrl
 * @description Generated the encoded URL based on the URL content.
 * @param {string} content Content URL.
 * @returns {string} Encoded URL.
 */
function getExpectedUrl(content) {
  return `${baseUrl}${encodeURIComponent(
    content
  )}`;
}

describe("QR URL Generator Helpers.", () => {
  test("was Website QR Code URL generated correctly?", () => {
    // Set data.
    const website = "https://my.awesome.web/site";

    // Get actual URL.
    const actualUrl = generateUrlQRCodeUrl(website);

    // Get expected URL.
    const expectedUrl = getExpectedUrl(website);

    // Validate.
    expect(actualUrl).toEqual(expectedUrl);
  });

  test("was Wifi QR Code URL generated correctly?", () => {
    // Set data.
    const networkInfo = {
      networkType: "wpa",
      networkName: "mynetwork",
      networkPassword: "mypassword",
    };

    // Get actual URL.
    const actualUrl = generateWifiQRCodeUrl(networkInfo);

    // Get expected URL.
    const expectedUrl = getExpectedUrl(
      `WIFI:T:${networkInfo.networkType.toUpperCase()};S:${
        networkInfo.networkName
      };P:${networkInfo.networkPassword};;`
    );

    // Validate.
    expect(actualUrl).toEqual(expectedUrl);
  });

  test("was VCard QR Code URL generated correctly?", () => {
    // Set data.
    const userInfo = {
      firstName: "Doe",
      lastName: "Pat",
      emails: ["patdoe@awesome.web"],
      phoneNumbers: [
        {
          number: "(111) 555-1212",
          type: "work",
        },
        {
          number: "(404) 555-1212",
          type: "home",
        },
      ],
    };

    // Get actual URL.
    const actualUrl = generateVCardQRCodeUrl(userInfo);

    // Get expected URL.
    const expectedUrl = getExpectedUrl(
      `BEGIN:VCARD\nVERSION:2.1\nN:${userInfo.firstName};${userInfo.lastName}\nEMAIL:${userInfo.emails[0]}\nTEL;WORK:${userInfo.phoneNumbers[0].number}\nTEL;HOME:${userInfo.phoneNumbers[1].number}\nEND:VCARD`
    );

    // Validate.
    expect(actualUrl).toEqual(expectedUrl);
  });
});
