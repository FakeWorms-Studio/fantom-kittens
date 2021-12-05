const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contract = await hre.ethers.getContractFactory(
    "SpecialKittensDistributor"
  );
  const contract = await Contract.deploy(
    // KittensHD
    "0xad956DF38D04A9A555E079Cf5f3fA59CB0a25DC9",
    // Kittens Specials
    "0xE65469083B4f50d1EcD089584c671Bb1d23F9AC7"
  );
  await contract.deployed();

  console.log("Deployed to:", contract.address);

  if (process.env.CHAIN_SCAN_TOKEN) {
    console.log("Verifying ze contract");
    await hre.run("verify:verify", {
      address: contract.address,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
