const fetch = require('node-fetch');

async function testHoneypot() {
  const auditId = "59f5f395-d036-42d0-af3b-ff0eb702b160";
  const url = "http://localhost:3001/api/lead";

  console.log("--- Testing Real User Submission (Empty Honeypot) ---");
  const res1 = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "realuser_" + Date.now() + "@example.com",
      auditId: auditId,
      company_website: ""
    })
  });
  const data1 = await res1.json();
  console.log("Status:", res1.status);
  console.log("Body:", data1);

  console.log("\n--- Testing Bot Submission (Filled Honeypot) ---");
  const botEmail = "bot_" + Date.now() + "@example.com";
  const res2 = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: botEmail,
      auditId: auditId,
      company_website: "http://spam-site.com"
    })
  });
  const data2 = await res2.json();
  console.log("Status:", res2.status);
  console.log("Body:", data2);
}

testHoneypot();
