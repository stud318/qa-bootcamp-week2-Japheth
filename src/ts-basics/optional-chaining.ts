type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
// Optional property access operator (?.)
// If customer is null or undefined, this returns undefined instead of throwing an error.
console.log(customer?.birthday?.getFullYear());

let customer2 = getCustomer(1);
// This will print the current year because customer2 is not null.
console.log(customer2?.birthday?.getFullYear());
