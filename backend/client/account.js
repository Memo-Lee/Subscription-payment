const Craftgate = require("@craftgate/craftgate");

var craftgate = new Craftgate.Client({
    apiKey: "sandbox-vdWyUSqzSCSOvgnffuqWcDNhSTcIIEtD",
    secretKey: "sandbox-AvwAaVeHGfVlXSDSXxjLPljQBHAWUGFU",
    baseUrl: "https://sandbox-api.craftgate.io",
  });

module.exports = craftgate;