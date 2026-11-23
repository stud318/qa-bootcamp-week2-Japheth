// 1. Type alias
type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

// 2. Three test users
const user1: UserProfile = {
  id: 1,
  username: "alice",
  settings: { notifications: true },
};

const user2: UserProfile = {
  id: 2,
  username: "bob",
  // no settings
};

const user3: UserProfile = {
  id: 3,
  username: "charlie",
  settings: {}, // settings exists, but notifications is missing
};

// 3. Validator function using optional chaining
function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

// 4. Run and print
console.log("User 1:", isNotified(user1)); // Expected: true
console.log("User 2:", isNotified(user2)); // Expected: false
console.log("User 3:", isNotified(user3)); // Expected: false
