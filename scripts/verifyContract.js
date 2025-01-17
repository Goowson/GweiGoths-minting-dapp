/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

require('@nomiclabs/hardhat-etherscan')
const hre = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('./whitelist.js')

const BASE_URI = 'TBA'
const proxyRegistryAddressRinkeby = '0xc24eC12f4C78747952B90Cd50571AC23F18857fa'
const proxyRegistryAddressMainnet = '0xc24eC12f4C78747952B90Cd50571AC23F18857fa'

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()

  await hre.run('verify:verify', {
    address: 'TBA', // Deployed contract address
    constructorArguments: [BASE_URI, root, proxyRegistryAddressRinkeby]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
