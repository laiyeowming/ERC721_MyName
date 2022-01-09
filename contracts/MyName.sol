// SPDX-License-Identifier: MIT
// The features required of the ERC721 contract:
// The token name will be “YOURNAME”
// Have a mint function with auto increment ID.
// Have a token burn function.
// Have a pause function to pause the functionality marked as whenNotPaused.
// Deploy the smart contract on the Ethereum Testnet (Ropsten/Rinkeby)
// Verify the source code in Etherscan
// Execute the following functions - mint, burn and pause function. 

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

contract MyName is ERC721, ERC721Enumerable, ERC721Pausable {
    string[] public mynames;
    mapping(string => bool) _nameExists;

    constructor() ERC721("LaiYM", "LYM") public {
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override (ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _myname) public {
        require(!_nameExists[_myname]);
        mynames.push(_myname);
        uint _id = mynames.length;
        _mint(msg.sender, _id);
        _nameExists[_myname] = true;
    }

    function burn(uint _id) public {
        require(_nameExists[mynames[_id]]);
        _burn(_id);
        _nameExists[mynames[_id]] = false;
    }

    function pause() public {
        _pause();
    }

    function unpause() public {
        _unpause();
    }
}
