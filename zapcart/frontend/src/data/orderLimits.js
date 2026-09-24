// Purchase threshold configuration for cart/checkout.
// Centralized here so CartDrawer, CheckoutModal, and any future
// screens all enforce the same limits.

export const MIN_ORDER_AMOUNT = 5.0;   // smallest allowed cart subtotal
export const MAX_ORDER_AMOUNT = 150.0; // largest allowed cart subtotal (fraud / abuse guard)

export function getOrderLimitIssue(subtotal) {
  if (subtotal <= 0) return null; // empty cart is handled separately
  if (subtotal < MIN_ORDER_AMOUNT) {
    return {
      type: "below-min",
      message: `Add $${(MIN_ORDER_AMOUNT - subtotal).toFixed(2)} more to reach the $${MIN_ORDER_AMOUNT.toFixed(2)} order minimum.`,
    };
  }
  if (subtotal > MAX_ORDER_AMOUNT) {
    return {
      type: "above-max",
      message: `This cart exceeds the $${MAX_ORDER_AMOUNT.toFixed(2)} single-order maximum. Please remove some items or split into two orders.`,
    };
  }
  return null;
}
