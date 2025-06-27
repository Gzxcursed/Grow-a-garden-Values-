const pets = [{'name': 'Mimic Octopus', 'value': '25T', 'demand': 9, 'status': 'over'}, {'name': 'Raccoon', 'value': '22.5T', 'demand': 9, 'status': 'over'}, {'name': 'Disco Bee', 'value': '20T', 'demand': 10, 'status': 'over'}, {'name': 'Butterfly', 'value': '15T', 'demand': 9, 'status': 'over'}, {'name': 'Dragonfly', 'value': '13T', 'demand': 10, 'status': 'fair'}, {'name': 'Queen Bee', 'value': '6T', 'demand': 9, 'status': 'over'}, {'name': 'Bear Bee', 'value': '1T–3T', 'demand': 9, 'status': 'fair'}, {'name': 'Chicken Zombie', 'value': '900B–1T', 'demand': 5, 'status': 'under'}, {'name': 'Red Fox', 'value': '850B', 'demand': 6, 'status': 'under'}, {'name': 'Moon Cat', 'value': '800B', 'demand': 7, 'status': 'fair'}, {'name': 'Dog', 'value': '100M', 'demand': 2, 'status': 'under'}, {'name': 'Cat', 'value': '120M', 'demand': 2, 'status': 'under'}, {'name': 'Mouse', 'value': '140M', 'demand': 3, 'status': 'under'}, {'name': 'Ladybug', 'value': '150M', 'demand': 3, 'status': 'under'}, {'name': 'Frog', 'value': '200M', 'demand': 3, 'status': 'under'}, {'name': 'Snail', 'value': '250M', 'demand': 2, 'status': 'under'}, {'name': 'Worm', 'value': '300M', 'demand': 2, 'status': 'under'}, {'name': 'Shiny Snail', 'value': '350M', 'demand': 2, 'status': 'under'}, {'name': 'Butterfly Larva', 'value': '400M', 'demand': 2, 'status': 'under'}, {'name': 'Squirrel', 'value': '450M', 'demand': 3, 'status': 'fair'}, {'name': 'Duckling', 'value': '500M', 'demand': 4, 'status': 'fair'}, {'name': 'Blue Bird', 'value': '600M', 'demand': 4, 'status': 'under'}, {'name': 'Pink Bunny', 'value': '700M', 'demand': 5, 'status': 'fair'}, {'name': 'Caterpillar', 'value': '850M', 'demand': 5, 'status': 'fair'}, {'name': 'Hedgehog', 'value': '900M', 'demand': 5, 'status': 'fair'}, {'name': 'Owl', 'value': '1B', 'demand': 6, 'status': 'fair'}, {'name': 'Raccoon Cub', 'value': '1.1B', 'demand': 6, 'status': 'fair'}, {'name': 'Golden Bee', 'value': '1.25B', 'demand': 7, 'status': 'over'}, {'name': 'Fire Ant', 'value': '1.5B', 'demand': 6, 'status': 'fair'}, {'name': 'Lava Slug', 'value': '2B', 'demand': 6, 'status': 'under'}];

const tableBody = document.querySelector("#valuesTable tbody");
const searchInput = document.getElementById("searchInput");

function renderPets(data) {
  tableBody.innerHTML = "";
  data.forEach(pet => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.value}</td>
      <td>${pet.demand}/10</td>
      <td><span class="status ${pet.status}">${pet.status.toUpperCase()}</span></td>
    `;
    tableBody.appendChild(row);
  });
}
renderPets(pets);

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = pets.filter(pet => pet.name.toLowerCase().includes(term));
  renderPets(filtered);
});

function parseValue(val) {
  if (val.includes("–")) val = val.split("–")[0];
  val = val.replace(/[^0-9.kmbt]/gi, "").toLowerCase();
  let multiplier = 1;
  if (val.includes("k")) { multiplier = 1e3; val = val.replace("k", ""); }
  if (val.includes("m")) { multiplier = 1e6; val = val.replace("m", ""); }
  if (val.includes("b")) { multiplier = 1e9; val = val.replace("b", ""); }
  if (val.includes("t")) { multiplier = 1e12; val = val.replace("t", ""); }
  return parseFloat(val) * multiplier;
}

function sortPets(type, direction) {
  const sorted = [...pets].sort((a, b) => {
    let aVal = type === "value" ? parseValue(a.value) : a.demand;
    let bVal = type === "value" ? parseValue(b.value) : b.demand;
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  });
  renderPets(sorted);
}
