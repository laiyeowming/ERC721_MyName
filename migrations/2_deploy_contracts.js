// SPDX-License-Identifier: MIT
const MyName = artifacts.require("MyName");

module.exports = function(deployer) {
  deployer.deploy(MyName);
};
