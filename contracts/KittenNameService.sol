// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KittenNameService {
  mapping(uint256 => string) public names; 
  address owner;
  ERC721 Kittens = ERC721(0xfD211f3B016a75bC8d73550aC5AdC2f1cAE780C0);

  constructor(address kittensAddress) {
    owner = msg.sender;
    Kittens = ERC721(kittensAddress);
  }

  function setKittenName(uint256 kittenId, string memory newKittenName) public {
    require(Kittens.ownerOf(kittenId) == msg.sender || msg.sender == owner, "You do not own this kitten");
    require(bytes(newKittenName).length < 16, "Max name length is 15 chars");

    names[kittenId] = newKittenName;
  }

  function setKittensAddress(address addr) public {
    require(msg.sender == owner, "Only owner");

    Kittens = ERC721(addr);
  }
}