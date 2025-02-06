import "dotenv/config";
var keyEnvBased = {};
var keyCommon = {
  secretOrKey: "U2FsdGVkX1+tLsYUVkBGSdsFY4xwPUGLJTdDJ9Z+0H8=",
};

keyEnvBased = {
  mongoURI: process.env.MONGOURI,
};

let key = { ...keyCommon, ...keyEnvBased };

export default key;
