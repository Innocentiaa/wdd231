const spotlightContainer = document.querySelector('.spotlights .spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    // Filter Silver and Gold
    const qualified = data.filter(member =>
      member.membership === 2 || member.membership === 3
    );

    // Randomize and select 2 or 3
    const selected = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership:</strong> ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load spotlights:', error);
  }
}

getSpotlights();
