const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [/* ABI array here */];
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function processPayment() {
    try {
        const totalAmount = parseFloat(document.getElementById('totalAmount').textContent); // Total in INR
        const ethAmount = totalAmount / 50000; // Example conversion rate INR to ETH
        const accounts = await web3.eth.getAccounts();
        
        // Example: Call your contract method to process payment
        await contract.methods.placeOrder().send({ from: accounts[0], value: web3.utils.toWei(ethAmount.toString(), 'ether') });
        
        alert('Payment successful! Your order has been placed.');
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('Error processing payment. Please try again later.');
    }
}

const stripe = Stripe('your-public-key-here');

async function processPaymentWithStripe() {
    try {
        // Fetch the cart items from sessionStorage
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};

        // Convert cart items to an array of items for Stripe
        const itemsForStripe = Object.values(cartItems).map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Amount in cents
            },
            quantity: item.count,
        }));

        // Create a checkout session on the server
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: itemsForStripe,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error processing payment with Stripe:', error);
        alert('Error processing payment with Stripe. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};

    // Update checkout page with cart items and total amount
    let totalAmount = 0;
    for (const key in cartItems) {
        if (cartItems.hasOwnProperty(key)) {
            const item = cartItems[key];
            const itemTotal = item.count * parseFloat(item.price);
            totalAmount += itemTotal;
            checkoutItemsContainer.innerHTML += `
                <div>
                    <span>${item.name}</span>
                    <span>Quantity: ${item.count}</span>
                    <span>Price: ₹ ${item.price}</span>
                </div>
            `;
        }
    }
    totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
});
