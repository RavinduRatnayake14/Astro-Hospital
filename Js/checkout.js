// Load order summary from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart-items")) || [];
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    let totalPrice = 0;

    // Populate order items dynamically
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderItems.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;
});

// Handle checkout form submission
document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate input fields
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (name && address && payment) {
        // Calculate delivery date (3 days from today)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        // Display order confirmation
        alert(`Thank you for your purchase, ${name}!
Your order will be delivered to ${address} by ${deliveryDate.toDateString()}.`);

        // Clear cart and redirect to the main page
        localStorage.removeItem("cart-items");
        window.location.href = "index.html";
    } else {
        alert("Please fill in all the details before proceeding.");
    }
});
