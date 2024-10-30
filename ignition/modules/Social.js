const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Social", (m) => {
  const social = m.contract("SocialPlatform");

  return { social };
});
