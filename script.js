let generated = false;

// 🔹 Random Indian locality pool (FAST – no API)
const localities = [
  "Shiv Nagar", "Ram Colony", "Azad Nagar", "New Market",
  "Gandhi Tola", "Ambedkar Nagar", "Laxmi Vihar",
  "Krishna Puram", "Indira Colony", "Subhash Chowk",
  "Jawahar Nagar", "Rajeev Vihar"
];

const blocks = [
  "Sadar", "Urban", "Rural", "Central",
  "North Block", "South Block", "East Block", "West Block"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomGovtID() {
  return "UIM" + Math.floor(1000000 + Math.random() * 9000000);
}

function showLoader() {
  generated = false;
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("msg").innerText = "";
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function generateAll() {
  showLoader();

  fetch("https://ipapi.co/json/")
    .then(r => r.json())
    .then(d => {
      if (!d.postal) {
        fallbackStatic();
        return;
      }

      const flat = "Flat No. " + Math.floor(1 + Math.random() * 500);
      const locality = randomItem(localities);
      const block = randomItem(blocks);

      const address =
        `${flat}, ${locality}, ` +
        `P.O. ${locality}, Block ${block}, ` +
        `${d.city}, ${d.region}, ${d.postal}, India`;

      fillData(d.postal, address);
    })
    .catch(() => fallbackStatic());
}

// 🟢 100% instant fallback (no API)
function fallbackStatic() {
  const pin = "1100" + Math.floor(10 + Math.random() * 89);

  const flat = "Flat No. " + Math.floor(1 + Math.random() * 500);
  const locality = randomItem(localities);
  const block = randomItem(blocks);

  const address =
    `${flat}, ${locality}, ` +
    `P.O. ${locality}, Block ${block}, ` +
    `New Delhi, Delhi, ${pin}, India`;

  fillData(pin, address);
}

function fillData(pin, address) {
  if (generated) return;
  generated = true;

  hideLoader();

  document.getElementById("govtId").innerText = randomGovtID();
  document.getElementById("pincode").innerText = pin;
  document.getElementById("address").innerText = address;

  const msg = document.getElementById("msg");
  msg.style.color = "lightgreen";
  msg.innerText = "⚡ Generated instantly (unique address)";
}

function copyText(id, boxId) {
  const text = document.getElementById(id).innerText;
  if (!text || text === "----") return;

  navigator.clipboard.writeText(text).then(() => {
    const box = document.getElementById(boxId);
    box.classList.add("copied-box");
    setTimeout(() => box.classList.remove("copied-box"), 800);
  });
}
