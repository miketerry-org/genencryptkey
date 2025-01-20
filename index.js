#!/usr/bin/env node

import crypto from "crypto";
import fs from "fs";
import clipboardy from "clipboardy";
import path from "path";

// Function to generate a secure 256-bit AES key (32 bytes)
function generateKey() {
  // Generate the key (base64 encoding for readability)
  return crypto.randomBytes(32).toString("base64");
}

// Function to copy the generated key to clipboard
function copyToClipboard(key) {
  clipboardy.writeSync(key);
  console.log("Encryption key copied to clipboard.");
}

// Function to save the generated key to a file
function saveToFile(key, filename) {
  const filePath = path.resolve(filename);
  fs.writeFileSync(filePath, key);
  console.log(`Encryption key saved to ${filePath}`);
}

// Parse command-line arguments
const args = process.argv.slice(2);
let copy = false;
let saveFile = null;

// Parsing flags
args.forEach((arg) => {
  if (arg === "--copy") {
    copy = true;
  } else if (arg.startsWith("--save=")) {
    saveFile = arg.split("=")[1];
  } else {
    console.log("Usage: genencryptkey [--copy] [--save=filename]");
    process.exit(1);
  }
});

// Generate the key
const key = generateKey();

// Handle the actions based on flags
if (copy) {
  copyToClipboard(key);
} else if (saveFile) {
  saveToFile(key, saveFile);
} else {
  // Default behavior: Display the key to console
  console.log("Generated Encryption Key:", key);
}
