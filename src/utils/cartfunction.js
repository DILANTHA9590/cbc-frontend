export function loardCard() {
  const cart = localStorage.getItem("cart");

  if (cart != null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function addToCard(productId, qty) {
  const cart = loardCard();
  // console.log(cart);

  const index = cart.findIndex((item) => {
    return item.productId == productId;
  });

  if (index == -1) {
    cart.push({ productId, qty });
  } else {
    const newQty = (cart[index].qty = cart[index].qty + qty);
    //
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }

  saveCart(cart);
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function deleteItem(productId) {
  let cart = loardCard();
  console.log("🛒 Before Deleting:", cart);

  const index = cart.findIndex((item) => item.productId == productId);

  if (index === -1) {
    console.error(" Product Not Found in Cart");
    return;
  }

  cart.splice(index, 1);
  saveCart(cart);

  console.log(" After Deleting:", cart);
}
