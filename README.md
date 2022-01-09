## ERC721_MyName Project with truffle/ganache/react.js

### Development with MyName.sol && Name.test.js
1) Attempting with some of the following dependencies:
- truffle: 5.4.27
- @openzeppelin/contracts: 4.4.1
- react: 17.0.2
- web3: 1.6.1


2) Truffle test with ganache testnet as below:
```
  Contract: MyName
    deployment
      ✓ deploy successfully
      ✓ has a name (60ms)
      ✓ has a symbol (45ms)
    empty burn
      ✓ burns with no tokenId (845ms)
    minting
      ✓ creates a new token (536ms)
    indexing
      ✓ lists names (1363ms)
    burning
      ✓ burns a new token (729ms)
    pausing and unpausing
      ✓ pause (1106ms)
      ✓ unpause (1302ms)
  9 passing (7s)
  ```
  
 3) Deployment on Ropsten with React.js/web3.js:
 <img src = "https://raw.githubusercontent.com/laiyeowming/ERC721_MyName/main/images/dapp1.png" width="600px">
