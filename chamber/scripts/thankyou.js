const params = new URLSearchParams(window.location.search);

document.getElementById("fname").textContent = params.get("fname") || "";
document.getElementById("lname").textContent = params.get("lname") || "";
document.getElementById("email").textContent = params.get("email") || "";
document.getElementById("phone").textContent = params.get("phone") || "";
document.getElementById("orgname").textContent = params.get("orgname") || "";
document.getElementById("timestamp").textContent = params.get("timestamp") || "";
