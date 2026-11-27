function calculateTax(income: number, taxRate: number, taxYear = 2022): number {
  if (taxYear < 2022) {
    return income * 1.2;
  }
  return income * (1 + taxRate);
}

// Using a descriptively named constant for the tax rate
const taxRate = 0.16;
const income = 10_000;

// taxYear here will override the default value of 2022
console.log(calculateTax(income, taxRate, 2025));
