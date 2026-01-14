import bcrypt from "bcryptjs";

const plainPassword = "Vincent@2025";

const hash = await bcrypt.hash(plainPassword, 10);
console.log(hash);