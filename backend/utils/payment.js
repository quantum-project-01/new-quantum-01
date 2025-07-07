const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create payment order
const initiatePayment = async (orderData) => {
  try {
    const { amount, currency = 'INR', receipt, notes = {} } = orderData;
    
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes,
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw new Error('Failed to initiate payment');
  }
};

// Verify payment signature
const verifyPayment = (paymentData) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    return razorpay_signature === expectedSign;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

// Fetch payment details
const getPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
};

// Process refund
const processRefund = async (paymentId, amount = null) => {
  try {
    const refundData = {
      payment_id: paymentId
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to paise
    }

    const refund = await razorpay.payments.refund(paymentId, refundData);
    return refund;
  } catch (error) {
    console.error('Error processing refund:', error);
    throw new Error('Failed to process refund');
  }
};

// Get all payments for an order
const getOrderPayments = async (orderId) => {
  try {
    const payments = await razorpay.orders.fetchPayments(orderId);
    return payments;
  } catch (error) {
    console.error('Error fetching order payments:', error);
    throw new Error('Failed to fetch order payments');
  }
};

// Webhook signature verification
const verifyWebhookSignature = (body, signature) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(body))
      .digest('hex');

    return signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
  getPaymentDetails,
  processRefund,
  getOrderPayments,
  verifyWebhookSignature
}; 