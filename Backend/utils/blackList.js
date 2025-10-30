// blacklist.js
let blacklistedTokens = [];

const addTokenToBlacklist = (token) => {
  blacklistedTokens.push(token);
};

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.includes(token);
};

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
