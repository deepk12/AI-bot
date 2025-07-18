const fs = require("fs");
const readline = require("readline");
const notifier = require("node-notifier");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("🕒 Reminder Bot is running!");
console.log("Type like: Drink water in 2 minutes");
console.log("Supports: seconds / minutes / hours");

rl.on("line", (input) => {
  const match = input.match(/^(.+?)\s+in\s+(\d+)\s*(seconds?|secs?|minutes?|mins?|hours?)$/i);

  if (!match) {
    console.log("⚠️ Format: <task> in <number> [seconds/minutes/hours]");
    return;
  }

  const task = match[1].trim();
  const number = parseInt(match[2]);
  const unit = match[3].toLowerCase();

  // Convert to milliseconds
  let ms;
  if (unit.startsWith("sec")) ms = number * 1000;
  else if (unit.startsWith("min")) ms = number * 60 * 1000;
  else if (unit.startsWith("hour")) ms = number * 60 * 60 * 1000;

  const dueTime = new Date(Date.now() + ms);
  const timeString = dueTime.toLocaleTimeString();

  console.log(`✅ Reminder set: "${task}" at ${timeString}`);

  // Save to file
  const logLine = `Task: ${task} | Due: ${timeString}\n`;
  fs.appendFileSync("reminders.txt", logLine);

  // Set reminder
  setTimeout(() => {
    console.log(`🔔 Reminder: ${task}\x07`); // \x07 = beep
    notifier.notify({
      title: 'Reminder Bot',
      message: task,
      sound: true,
    });

    // Mark as done in file
    fs.appendFileSync("reminders.txt", `✅ Done: ${task} at ${new Date().toLocaleTimeString()}\n`);
  }, ms);
});













// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// console.log("🕒 Reminder Bot is running!");
// console.log("Type your reminder like this: <task> in <seconds>");
// console.log("Example: Drink water in 10");

// rl.on("line", (input) => {
//   const match = input.match(/^(.+)\s+in\s+(\d+)$/i);

//   if (match) {
//     const task = match[1];
//     const seconds = parseInt(match[2]);

//     console.log(`✅ Reminder set: "${task}" in ${seconds} seconds`);

//     setTimeout(() => {
//       console.log(`🔔 Reminder: ${task}`);
//     }, seconds * 1000);
//   } else {
//     console.log("⚠️ Please enter in the format: <task> in <seconds>");
//   }
// });
