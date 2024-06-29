// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract YasfikToken is Ownable, ERC20Capped, ERC20Burnable {
    uint256 public rewardPerBlock;

    constructor(
        uint256 _cap,
        uint256 _rewardPerBlock
    )
        ERC20("YSF", "YasfikToken")
        Ownable(msg.sender)
        ERC20Capped(_cap * (10 ** decimals()))
    {
        _mint(msg.sender, (_cap * (10 ** decimals())) / 4);
        rewardPerBlock = _rewardPerBlock;
    }

    function rewardMiner() external {
        require(
            msg.sender == block.coinbase,
            "Only the block miner can distribute rewards"
        );
        _mint(msg.sender, rewardPerBlock);
    }

    function setRewardBlock(uint256 _reward) external onlyOwner {
        rewardPerBlock = _reward;
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20Capped, ERC20) {
        super._update(from, to, value);

        if (from == address(0)) {
            uint256 maxSupply = cap();
            uint256 supply = totalSupply();
            if (supply > maxSupply) {
                revert ERC20ExceededCap(supply, maxSupply);
            }
        }
    }
}