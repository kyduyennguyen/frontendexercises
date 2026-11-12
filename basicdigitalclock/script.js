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
