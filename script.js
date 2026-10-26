// Default launch: 7 days from now. Try changing DEFAULT_DAYS to 30!
const DEFAULT_DAYS = 7;

const nameEl = document.getElementById("name");
const doneEl = document.getElementById("done");
const form = document.getElementById("settings");
const campaignInput = document.getElementById("campaign");
const dateInput = document.getElementById("date");

const units = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

let launchTime = Date.now() + DEFAULT_DAYS * 24 * 60 * 60 * 1000;

function tick() {
  const msLeft = launchTime - Date.now();

  if (msLeft <= 0) {
    Object.values(units).forEach((el) => (el.textContent = "0"));
    doneEl.hidden = false;
    return;
  }

  doneEl.hidden = true;
  const totalSeconds = Math.floor(msLeft / 1000);
  units.days.textContent = Math.floor(totalSeconds / 86400);
  units.hours.textContent = Math.floor((totalSeconds % 86400) / 3600);
  units.minutes.textContent = Math.floor((totalSeconds % 3600) / 60);
  units.seconds.textContent = totalSeconds % 60;
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  if (campaignInput.value.trim()) {
    nameEl.textContent = campaignInput.value.trim();
  }
  if (dateInput.value) {
    launchTime = new Date(dateInput.value).getTime();
  }
  tick();
});

tick();
setInterval(tick, 1000);
