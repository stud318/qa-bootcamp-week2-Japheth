// Defining an object with a specific structure
let employee: { id: number; name: string; department?: string } = {
  id: 1,
  name: "Japheth",
};

// Adding an optional property later
employee.department = "QA";

console.log(`Employee: ${employee.name}, Dept: ${employee.department}`);
