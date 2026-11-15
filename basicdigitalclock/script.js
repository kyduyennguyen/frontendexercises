// Update Clock for basic digital clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString("vn-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

updateClock();
setInterval(updateClock, 1000);

// Update Timer for countdown timer
// Set the target date and time
const targetDate = new Date("2026-12-31T23:59:59").getTime();
function updateTimer() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML = "<h3>Time's Up!!!<h3>";
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}
updateTimer();
setInterval(updateTimer, 1000);
