// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    IERC20 public token;
    uint256 public claimAmount;
    uint256 public lockTime = 1 minutes;

    mapping(address => uint256) public lastClaimedTimestamp;
    mapping(address => uint256) public claimedAmount;

    event Withdrawal(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);

    constructor(IERC20 _token, uint256 _claimAmount) Ownable(msg.sender) {
        token = _token;
        claimAmount = _claimAmount * (10 ** 18);
    }

    function requestToken() external {
        require(msg.sender != address(0), "Invalid address");
        require(
            token.balanceOf(address(this)) >= claimAmount,
            "Inusufficient balance in the faucet"
        );
        require(
            lastClaimedTimestamp[msg.sender] + lockTime <= block.timestamp,
            "You have already claimed faucet in a lock time, try again later"
        );
        require(
            claimedAmount[msg.sender] + claimAmount <= claimAmount * 20,
            "You have already reached the claim limit"
        );

        lastClaimedTimestamp[msg.sender] = block.timestamp;
        bool success = token.transfer(msg.sender, claimAmount);
        require(success, "Token transfer failed");
        claimedAmount[msg.sender] += claimAmount;
    }

    function setLockTime(uint256 _time) external onlyOwner {
        lockTime = _time * 1 minutes;
    }

    function setClaimAmount(uint256 _amount) external onlyOwner {
        claimAmount = _amount * (10 ** this.decimals());
    }

    function getClaimAmount() external view returns (uint256) {
        return claimAmount;
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(
            _amount <= token.balanceOf(address(this)),
            "Inusufficient balance in the faucet"
        );
        token.transfer(msg.sender, _amount * (10 ** this.decimals()));
        emit Withdrawal(msg.sender, _amount);
    }

    function deposit(uint256 _amount) external {
        token.transferFrom(msg.sender, address(this), _amount);
        emit Deposit(msg.sender, _amount);
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }
}
