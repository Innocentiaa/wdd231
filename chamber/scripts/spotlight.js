const spotlightContainer = document.querySelector('.spotlights');

async function getSpotlights() {
  const response = await fetch('data/members.json');
  const data = await response.json();

  // Filter only silver or gold
  const goldSilver = data.members.filter(member =>
    member.membership === 'Gold' || member.membership === 'Silver'
  );

  // Shuffle and pick 2 or 3
  const randomSpotlights = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Display them
  randomSpotlights.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.logo}" alt="${member.name} logo">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    spotlightContainer.appendChild(card);
  });
}

getSpotlights();
