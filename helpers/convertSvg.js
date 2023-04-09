/**
 * @function
 * @name convertSvg
 * @description Converts an SVG string to a Blob URL that can be used with the `next/image` component.
 * @param {string} svg - The SVG string to convert.
 * @returns {string} The Blob URL generated from the SVG string.
 */
module.exports = function convertSvg(svg) {
  try {
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const svgURL = URL.createObjectURL(svgBlob);

    return svgURL;
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};
