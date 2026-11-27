type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

let customer2 = getCustomer(1);
console.log(customer2?.birthday?.getFullYear());

let customers: Customer[] | null = null;
console.log(customers?.[0]);
