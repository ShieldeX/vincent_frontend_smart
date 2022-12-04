import hre, { ethers } from "hardhat";

async function main() {
  const [defaultAdmin] = await hre.ethers.getSigners();
  const memberRole = await ethers
    .getContractFactory("MemberRole")
    .then((f) => f.deploy());

  console.log(
    "Deploying MemberRole \ntransaction: ",
    memberRole.deployTransaction.hash,
    "\naddress: ",
    memberRole.address
  );

  await memberRole.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
