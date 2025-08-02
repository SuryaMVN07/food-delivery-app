// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FiestoTransaction {
    address public owner;
    mapping(address => uint) public balances;

    event OrderPlaced(address indexed user, uint amount);
    event OrderDelivered(address indexed user, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function placeOrder() public payable {
        require(msg.value > 0, "Order amount must be greater than zero.");
        balances[msg.sender] += msg.value;
        emit OrderPlaced(msg.sender, msg.value);
    }

    function deliverOrder(address user) public {
        require(msg.sender == owner, "Only the owner can deliver orders.");
        require(balances[user] > 0, "No orders found for this user.");
        uint amount = balances[user];
        balances[user] = 0;
        payable(owner).transfer(amount);
        emit OrderDelivered(user, amount);
    }
}
