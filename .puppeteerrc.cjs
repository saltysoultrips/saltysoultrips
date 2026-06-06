const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to be within the project directory
  // so that Vercel can cache it and find the executable during build.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
