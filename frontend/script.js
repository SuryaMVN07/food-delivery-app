const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [/* ABI array here */];
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function processPayment() {
    alert('Web3 Payment mock successful! In a real app, this would deduct ETH from your wallet.');
    sessionStorage.removeItem('cartItems');
    window.location.href = 'index.html';
}

const stripe = Stripe('your-public-key-here');

async function processPaymentWithStripe() {
    alert('Stripe Payment mock successful! In a real app, this would redirect to a checkout session.');
    sessionStorage.removeItem('cartItems');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};

    // Update checkout page with cart items and total amount
    if (checkoutItemsContainer && totalAmountElement) {
        let totalAmount = 0;
        for (const key in cartItems) {
            if (cartItems.hasOwnProperty(key)) {
                const item = cartItems[key];
                const itemPriceStr = String(item.price).replace(/[^\d.]/g, '');
                const itemPrice = parseFloat(itemPriceStr);
                const itemTotal = item.count * itemPrice;
                totalAmount += itemTotal;
                checkoutItemsContainer.innerHTML += `
                    <div>
                        <span>${item.name}</span>
                        <span>Quantity: ${item.count}</span>
                        <span>Price: ₹ ${itemPriceStr}</span>
                    </div>
                `;
            }
        }
        totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
    }
});
