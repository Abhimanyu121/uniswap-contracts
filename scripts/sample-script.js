// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const TestToken = await ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy();
  await testToken.deployed();
  console.log("testToken Address: ", testToken.address);

  //Deploy WETH
  const weth = await ethers.getContractFactory("WETH9");
  const wethInstance = await weth.deploy();
  await wethInstance.deployed();

  console.log(`WETH deployed to : ${wethInstance.address}`);

  //Deploy Factory
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await factory.deploy(deployerAddress);
  await factoryInstance.deployed();

  console.log(`Factory deployed to : ${factoryInstance.address}`);

  //Deploy Router passing Factory Address and WETH Address
  const router = await ethers.getContractFactory("UniswapV2Router02");
  const routerInstance = await router.deploy(
    factoryInstance.address,
    wethInstance.address
  );
  await routerInstance.deployed();

  console.log(`Router V02 deployed to :  ${routerInstance.address}`);

  const approveTx = await testToken.approve(
    routerInstance.address,
    ethers.utils.parseEther("10000000")
  );
  await approveTx.wait();

  const addLiquidityETHTx = await routerInstance.addLiquidityETH(
    testToken.address,
    ethers.utils.parseEther("10000000"),
    ethers.utils.parseEther("10000000"),
    ethers.utils.parseEther("0.1"),
    account.address,
    Math.ceil(Date.now() / 1000 + 3600),
    {
      value: ethers.utils.parseEther("0.1"),
    }
  );

  await addLiquidityETHTx.wait();

  const approveTx1 = await testToken.approve(
    routerInstance.address,
    ethers.utils.parseEther("10000000")
  );
  await approveTx1.wait();

  const approveTx2 = await wethInstance.approve(
    routerInstance.address,
    ethers.utils.parseEther("10000000")
  );
  await approveTx2.wait();

  const swapExactTokensForTokensTx =
    await routerInstance.swapExactTokensForTokens(
      ethers.utils.parseEther("100"),
      ethers.utils.parseEther("0"),
      [testToken.address, wethInstance.address],
      deployerAddress,
      Math.ceil(Date.now() / 1000 + 3600)
    );

  await swapExactTokensForTokensTx.wait();

  //Deploy Multicall (needed for Interface)
  // const multicall = await ethers.getContractFactory("Multicall");
  // const multicallInstance = await multicall.deploy();
  // await multicallInstance.deployed();

  // console.log(`Multicall deployed to : ${multicallInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });