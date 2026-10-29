require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;


  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing.");
  }

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required."
    );
  }

  if (password.length <5) {
    throw new Error("ADMIN_PASSWORD must be at least 5 characters long.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log("An administrator with this email already exists. No changes were made.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await Admin.create({ email, password: hashedPassword, role: "admin" });


  console.log(`Administrator account created for ${email}.`);
}

createAdmin()
  .catch((error) => {
    console.error("Could not create administrator:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
