// export const getImageUrl = (path) => {
//     return new URL(`./assets/${path}`, import.meta.url).href;
// };
/**
 * Generates a full URL for an asset in the src/assets directory
 * @param {string} path - The relative path to the asset (e.g., "images/hero.png")
 * @returns {string} Full URL to the asset
 */
export const getImageUrl = (path) => {
    try {
      return new URL(`./Assets/${path}`, import.meta.url).href;
    } catch (error) {
      console.error(`Error loading asset at path: ${path}`, error);
      return ''; // Return empty string or a fallback image path
    }
  };