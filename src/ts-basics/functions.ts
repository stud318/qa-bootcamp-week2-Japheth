// A simple function that takes two numbers and returns a number
function calculateTax(price: number, taxRate: number): number {
  return price * taxRate;
}

// Calling the function
const itemPrice = 100;
const tax = calculateTax(itemPrice, 0.16); // 16% tax
console.log(`The tax for a $${itemPrice} item is $${tax}`);
