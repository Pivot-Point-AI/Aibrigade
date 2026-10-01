#!/usr/bin/env node
/**
 * Create or update an admin user.
 *
 *   node --env-file=.env scripts/create-admin.mjs
 *   node --env-file=.env scripts/create-admin.mjs you@company.com "Your Name"
 *
 * The password is always asked for interactively (hidden), so it never lands in shell history.
 * Running it again for an existing email resets that admin's password.
 * (--env-file needs Node 20.6+. On older Node, set MONGODB_URI in the shell instead.)
 */
import mongoose from "mongoose";
import crypto from "node:crypto";
import readline from "node:readline";

// ---- same scheme as lib/password.js ----
const N = 16384, KEYLEN = 64;
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEYLEN, { N }).toString("hex");
  return `scrypt$${N}$${salt}$${hash}`;
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (s) => { if (s.includes(question)) process.stdout.write(s); };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Run with:  node --env-file=.env scripts/create-admin.mjs");
  process.exit(1);
}

const email = (process.argv[2] || (await ask("Admin email: "))).toLowerCase();
const name = process.argv[3] || "Admin";
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("That doesn't look like a valid email address.");
  process.exit(1);
}

const password = await ask("Password (min 10 chars): ", { hidden: true });
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}
const confirm = await ask("Confirm password: ", { hidden: true });
if (password !== confirm) {
  console.error("Passwords do not match.");
  process.exit(1);
}

await mongoose.connect(uri);
const Admin =
  mongoose.models.Admin ||
  mongoose.model(
    "Admin",
    new mongoose.Schema(
      {
        name: { type: String, trim: true, default: "Admin" },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
      },
      { timestamps: true, collection: "admins" }
    )
  );

const existing = await Admin.findOne({ email });
if (existing) {
  existing.passwordHash = hashPassword(password);
  existing.name = name;
  await existing.save();
  console.log(`Updated password for ${email}.`);
} else {
  await Admin.create({ email, name, passwordHash: hashPassword(password) });
  console.log(`Created admin ${email}.`);
}

await mongoose.disconnect();
