// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = document.lastModified;

const membersContainer = document.querySelector("#members-container");
const url = "data/members.json";

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

const displayMembers = (members) => {
  membersContainer.innerHTML = ""; // Clear existing members

  const isListView = membersContainer.classList.contains("list");

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const img = document.createElement("img");
    img.setAttribute("src", `images/${member.image}`);
    img.setAttribute("alt", `Logo of ${member.name}`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "200");
    img.setAttribute("height", "200");


    const info = document.createElement("div");
    info.classList.add("member-info");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.textContent = "Visit Website";

    const level = document.createElement("p");
    level.textContent = `Membership Level: ${
      member.membership === 1 ? "Member" : member.membership === 2 ? "Silver" : "Gold"
    }`;

    // Append info elements
    info.appendChild(name);
    if (!isListView) {
      const desc = document.createElement("p");
      desc.textContent = member.description;
      info.appendChild(desc);
    }
    info.appendChild(address);
    info.appendChild(phone);
    info.appendChild(website);
    info.appendChild(level);

    card.appendChild(img);
    card.appendChild(info);
    membersContainer.appendChild(card);
  });
};

// Load initial members
getMembers();

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.textContent = navList.classList.contains("open") ? "✖" : "☰";
});

// Grid/List view toggle with re-render
document.getElementById("grid-view").addEventListener("click", async () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
});

document.getElementById("list-view").addEventListener("click", async () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
});
