//api dan meythandi card eka save venna hadanna oni local storage eke api ara token eka save venna haduva vge mokada e
// ..api daraz ekata vge site valta web eken logo vela api add card karala close karla aai avoth e tika ehemmam pemnnava
//e nisda pi meka local eke thami save karanna oni
//dan api methanin balanava local sttorage cart eke item thiyeda kiyala thiyenavanam card ekea ganna kiyala
// anith eka thama api local strorage ekedi devaL SAVE VENNA STRING EKK VIDIHATA API TA CARD EKATA DATA ONI JSION
//  EKK VIDIHATA API ETHAKOTA ADALA local strorage eke thiyena data tika convert karanaganna oni json ekk vidihata

/* thava parak pahadili karfagathoth card eka kiyanne sankirna object ekkne
 api me card eka thiyagnna oni  json ekk hri arrey ekk vidihata thama thiyenne oni
 ethgakota api local strorage ek thama me cart eka me card eka json ne thiyenne  e json card ekasave karaganna hdanne 
 ehema save karaganne ehema karanakota api ta thiyena lojkuma barirer eka thama me json ekkkelinma local eke save
 storage eke  save karaganna ba ehema save akranna api me json eka string ekk vidihata convert karaganna oni
 */

//  dan apita me function eken thama ape card eka denne read karanne
export function loardCard() {
  // meya  dan card eka loard karanne string ekk vidihata
  const cart = localStorage.getItem("cart");

  //ita passe api karanava card eka null naththam string ccart eka json ekk vidihata convert karala return karanna kiyala
  if (cart != null) {
    return JSON.parse(cart);
  } else {
    //cart eka null nam api kiyanava emty arrey ekk return karanna kiyala
    return [];
  }
}

//methana  prashnayak enasvanm api card ekata product add karanne nadaa kiyala api cart ekataproduct add karnava
//dan api methana karala thiyenne api add karnna yana  product eka danatamath eyage cart eke thiyenavanm api
// aai eka add karala vadak nane api ekathama methanin mulinma check karanne

//  thiyenne aththtanma json  aerrey ekkne aththatama dan methanin return karanne
//mona item ekadakochchara quentityakinda

//ita passer epai dagannava add card function ekk
//mekata apata oni venava product ide ekakui quantity ekai
export function addToCard(productId, qty) {
  //api udat hiyenav function eke thiyena card eka loard karagannava

  const cart = loardCard();

  //meya karnne me cart eke thiyena hama itemekama dada test krala balanaava eke pid eka
  //api dimpupid ekatga samanda kiyala balanava samananam eka thibba e are eka location eka return karla denava
  // eka  thibichchi location eke index eka meka thiyenne mehemane
  /*
[
  pid
  qty,

  pid
  qty,

  pid
  qty
]

//dan me json eke adala location eka kiyanne inc=dex eka tham denne 0 nam palveni pid eka qty
ethakota earrye eka adala  location eka return karla me index eka athulata dagannav
   */
  //api dan methanain thama karnna e e add tocard functioin ekata
  // deval  add karagannavda naddakiyala balanne methanin api uda mulinma card eka loard
  // karala  methaninbalanav e crt eke api add karna id ekai samanada kiyala ehema samanam aii e item eka
  //add novenna thama meka hadanne ekam item eka depark add vela vadak nane
  //saralavama kiuvoth me product id eka danamath cart eke thiyenavada nadda kiyala thama balanne
  // balala eka thiyenavanam eke location eka denava
  //dan meya hoyala e product eka cart eke naththam meya dena agaya mokkda -1 thama meya denne
  //eka 3ehema thama mokda e item eka meke nane e nisa methanin dena agaya -1 kiyanne e item eka
  // meke na  ehema nathi unot venne oni eka thama api if index==-1 nam eka cart ekata dagannava
  const index = cart.findIndex((item) => {
    item.productId == productId;
  });

  if (index == -1) {
    cart.push({ productId, qty });

    // dan  me else part ekedi lkarala thiyene danatamath ehema product ekk thiyenavanam
    // e cart eke 0 position eke quantyty ekata api dena quantity eka ekathu karla penna kiyala
    //mokada dan api product eka issela cart ekata dala qty eka 2 daan api aye e item ekama aye thavapark  quantity
    // eka 3  karala ayeth card ekata add karanava ethakota methanin venne e adla item eke json eke danata thiyena qty ekata
    //api ayeth dena qty eka ekathu karala apita pennava ethakota apita aye aye ekama item eken cart eke pennane na ekatama
    //aye karapu chaneges ekk penanava

    //thavatrh saralava kiyuvgoth e adala index position eke thiye item danata thiyena qty ekata qapi ayeth add karan qrty eka ekathu venna kiyala

    /*t's break it down:

cart[index] - Gets the item at that position
.qty - Accesses the quantity of that item
= cart[index].qty + qty - Takes current quantity and adds new quantity

Real example:
javascriptCopy// Start with cart
let cart = [
  { productId: "123", qty: 2 }  // Customer has 2 items
];

// Customer adds 3 more
addToCart("123", 3);
// Cart becomes:
// [
//   { productId: "123", qty: 5 }  // Now has 5 items (2 + 3)
// ]

// Customer adds 2 more
addToCart("123", 2);
// Cart becomes:
// [
//   { productId: "123", qty: 7 }  // Now has 7 items (5 + 2)
// ]
So instead of creating a new entry, it just updates the quantity of the existing item by adding the new quantity to the current quantity. */

    // apita  dan methana adla index eka dunnama vdi venava vgema
    //adala index eka dunnama adu venava kiyalath therenava qty 5k thiyena ekatqaa ekk ekathu karama eka ekkin
    //updte vela a6k fvenava vegama api qty eka 5 k thiyeddi -1 kiyala euvoth  apata enne qty eka 4
  } else {
    const newQty = (cart[index].qty = cart[index].qty + qty);
    //
    if (newQty <= 0) {
      //methana api quantity eka 0 ho binduvata vada adu nam api spilce function eka magin
      //e adu vena adla index ekata adla item eka ain karanava me splice eka pavichi karama e sampurnyenama ain vela ilagata thiyena eka e posistion ekaya genava

      /*Benefits of using splice():

Completely removes the item
Shifts remaining items to fill the gap
Updates the array length correctly
Keeps the array clean without empty slots

Without splice(), you might get:

Holes in your array
Wrong length calculations
Problems when saving to localStorage
Issues when displaying cart items */

      cart.splice(index, 1);
    } else {
      // ehma  natghthma card eke adala item ekatala adala index eke thiyena qty eka aluth qty
      //  eken qty eke replace karaganava
      cart[index].qty = newQty;
    }
    // me vade ivara vela cart eka api dan save karagannava
  }

  // dan itapasse apita aii  cart eka save karaganna oni local storage eke
  // ekata api venama function ekk hadanava

  saveCart(cart);
}

export function saveCart() {
  // ita passe  api eva loacl storage ekata save karagannava
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Let me break down this code and explain how it works. This appears to be a shopping cart implementation using local storage.
// Shopping Cart Implementation with Local StorageClick to open code
// Let me explain how this shopping cart system works step by step:

// Local Storage Basics:

// Local storage lets you save data in the browser
// It only stores strings, so we need to convert objects to strings (using JSON)
// Data persists even after closing the browser

// The loadCart Function:

// Checks if there's a cart in local storage
// If found, converts the string back to a JavaScript object using JSON.parse
// If no cart exists, returns an empty array

// The addToCart Function:

// Takes a product ID and quantity as parameters
// Loads the existing cart
// Checks if the product is already in the cart using findIndex
// If product isn't in cart (index === -1), adds it as new item
// If product exists, increases the quantity
// Saves the updated cart back to storage

// Cart Structure:

// Cart is stored as an array of objects
// Each item has a productId and qty (quantity)
// Example: [{productId: "123", qty: 2}, {productId: "456", qty: 1}]

// The main improvements I made to your code:

// Added a separate saveCart function for clarity
// Fixed the findIndex callback function
// Added clear variable names
// Added example usage

// Would you like me to explain any specific part in more detail? CopyRetryDYIf product isn't in cart (index === -1), adds it as new item i am not undestandc d thisEditLet me explain the concept of index === -1 in more detail.
// When we use findIndex(), it searches through the cart array looking for a specific item. There are two possible outcomes:

// If it finds the item: returns the position (index) where it found it (0, 1, 2, etc.)
// If it doesn't find the item: returns -1

// Here's a simple example:
// javascriptCopy// Let's say this is our cart:
// const cart = [
//   { productId: "123", qty: 2 },
//   { productId: "456", qty: 1 }
// ];

// // Looking for product "123"
// const index = cart.findIndex(item => item.productId === "123");
// console.log(index); // Returns 0 (found at first position)

// // Looking for product "789" (which isn't in cart)
// const index2 = cart.findIndex(item => item.productId === "789");
// console.log(index2); // Returns -1 (not found)
// So when we write:
// javascriptCopyif (index === -1) {
//   // Product not in cart - add new item
//   cart.push({
//     productId: productId,
//     qty: quantity
//   });
// }
// We're saying:

// If index is -1, it means the product wasn't found in the cart
// Therefore, we need to add it as a new item using push()
// If index is not -1 (like 0, 1, 2...), it means the product was found, so we just update its quantity instead

// Would you like me to show you some more examples of how this works with different scenarios? CopyRetryClaude does not have the ability to run the code it generates yet.DYafter we add it -1 item it come 0,1,2,3,4  orr ...add valuesEditLet me explain how the array indices work after adding items.
// Yes, after you add items, they will get positions (indices) of 0, 1, 2, 3, 4, etc. Here's an example to demonstrate:
// javascriptCopy// Start with empty cart
// let cart = [];

// // Add first item
// addToCart("123", 1);
// // cart now looks like:
// // [
// //   { productId: "123", qty: 1 }  // index 0
// // ]

// // Add second item
// addToCart("456", 2);
// // cart now looks like:
// // [
// //   { productId: "123", qty: 1 },  // index 0
// //   { productId: "456", qty: 2 }   // index 1
// // ]

// // Add third item
// addToCart("789", 3);
// // cart now looks like:
// // [
// //   { productId: "123", qty: 1 },  // index 0
// //   { productId: "456", qty: 2 },  // index 1
// //   { productId: "789", qty: 3 }   // index 2
// // ]
// The -1 is ONLY used when searching for an item. Once items are in the cart:

// First item is at index 0
// Second item is at index 1
// Third item is at index 2
// And so on...

// If we then search for "456":
// javascriptCopyconst index = cart.findIndex(item => item.productId === "456");
// console.log(index); // Returns 1 because "456" is at position 1
// If we search for a product that doesn't exist:
// javascriptCopyconst index = cart.findIndex(item => item.productId === "999");
// console.log(index); // Returns -1 because "999" isn't in the cart
// Does this help explain how the indices work after items are added? CopyRetryClaude does not have the ability to run the code it generates yet.DYok we push 999 it add index 3EditYes, exactly! After pushing "999", it would become index 3. Let me show you:
// javascriptCopy// Current cart from before:
// // [
// //   { productId: "123", qty: 1 },  // index 0
// //   { productId: "456", qty: 2 },  // index 1
// //   { productId: "789", qty: 3 }   // index 2
// // ]

// // Now we add "999"
// addToCart("999", 1);
// // Cart becomes:
// // [
// //   { productId: "123", qty: 1 },  // index 0
// //   { productId: "456", qty: 2 },  // index 1
// //   { productId: "789", qty: 3 },  // index 2
// //   { productId: "999", qty: 1 }   // index 3
// // ]

// // If we search for "999" now:
// const index = cart.findIndex(item => item.productId === "999");
// console.log(index); // Returns 3 because "999" is at position 3
// When we use cart.push(), it always adds the new item at the end of the array, giving it the next available index number. So:

// First push -> index 0
// Second push -> index 1
// Third push -> index 2
// Fourth push -> index 3
// And so on...
//  CopyRetryClaude does not have the ability to run the code it generates yet.Claude can make mistakes. Please double-check responses.
