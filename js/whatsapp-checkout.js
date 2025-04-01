// whatsapp-checkout.js - Handles WhatsApp ordering functionality

/**
 * Generates a formatted WhatsApp message with order details
 * @param {Array} cartItems - Array of cart items
 * @param {Object} orderSummary - Order summary with totals
 * @param {Object} customerInfo - Optional customer information
 * @returns {string} - Encoded URL for WhatsApp
 */
function generateWhatsAppOrderMessage(cartItems, orderSummary, customerInfo = {}) {
    if (!cartItems || cartItems.length === 0) return '';

    // Start with greeting and intro
    let message = '🥩 *Prime Beef Order* 🥩\n\n';

    // Add cart items
    message += '*Order Items:*\n';
    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity}x $${item.price.toFixed(2)}`;

        // Add options if any
        if (Object.keys(item.options).length > 0) {
            message += ' (';
            message += Object.entries(item.options)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');
            message += ')';
        }

        message += ` = $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    // Add order summary
    message += '\n*Order Summary:*\n';
    message += `Subtotal: $${orderSummary.subtotal}\n`;
    message += `Tax (11%): $${orderSummary.tax}\n`;
    message += `Shipping: $${orderSummary.shipping === '0.00' ? 'Free' : '$' + orderSummary.shipping}\n`;
    message += `*Total: $${orderSummary.total}*\n\n`;

    // Add customer info if provided
    if (Object.keys(customerInfo).length > 0) {
        message += '*Customer Information:*\n';

        if (customerInfo.name) {
            message += `Name: ${customerInfo.name}\n`;
        }

        if (customerInfo.email) {
            message += `Email: ${customerInfo.email}\n`;
        }

        if (customerInfo.phone) {
            message += `Phone: ${customerInfo.phone}\n`;
        }

        if (customerInfo.address) {
            message += `Address: ${customerInfo.address}\n`;
        }

        if (customerInfo.city) {
            message += `City: ${customerInfo.city}\n`;
        }

        if (customerInfo.notes) {
            message += `Notes: ${customerInfo.notes}\n`;
        }

        message += '\n';
    }

    // Add closing
    message += 'Please confirm my order. Thank you!';

    // Encode the message for URL
    return encodeURIComponent(message);
}

/**
 * Opens WhatsApp with the prepared order message
 * @param {Array} cartItems - Cart items
 * @param {Object} orderSummary - Order summary
 * @param {Object} customerInfo - Customer information
 * @param {string} phoneNumber - WhatsApp phone number with country code
 */
function sendWhatsAppOrder(cartItems, orderSummary, customerInfo = {}, phoneNumber = '96170608543') {
    const message = generateWhatsAppOrderMessage(cartItems, orderSummary, customerInfo);

    if (message) {
        // Open WhatsApp with the message
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        return true;
    }

    return false;
}

/**
 * Collects form data and sends order via WhatsApp
 * @param {Object} formData - Form data from checkout page
 */
function processWhatsAppCheckout(formData) {
    // Get cart from store
    const cartItems = window.PrimeBeefStore.getCart();
    const orderSummary = window.PrimeBeefStore.getCartTotals();

    // Format customer info
    const customerInfo = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes || ''
    };

    // Send order via WhatsApp
    const success = sendWhatsAppOrder(cartItems, orderSummary, customerInfo);

    if (success) {
        // Clear cart after successful order
        window.PrimeBeefStore.clearCart();

        // Show success message or redirect
        return true;
    }

    return false;
}

// Export functions
window.PrimeBeefWhatsApp = {
    generateMessage: generateWhatsAppOrderMessage,
    sendOrder: sendWhatsAppOrder,
    processCheckout: processWhatsAppCheckout
};