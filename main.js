const d = 75;
const r = d / 2;
const r2 = r * r;

const voxelWidth = 5;
const voxelHeight = 3;

function draw(layer) {
  const z = -r + (layer + 0.5) * voxelHeight;

  grid.innerHTML = '';
  for (let row = 0; row < d / voxelWidth; row++) {
    const y = -r + (row + 0.5) * voxelWidth;
    const tr = document.createElement('tr');
    for (let col = 0; col < d / voxelWidth; col++) {
      const x = -r + (col + 0.5) * voxelWidth;
      const td = document.createElement('td');
      td.style.backgroundColor = shade(x, y, z);
      tr.appendChild(td);
    }
    grid.appendChild(tr);
  }
}

const offsets = [-1 / 3, 0, 1 / 3];
function shade(x, y, z) {
  let hits = 0;
  for (let dx of offsets) {
    for (let dy of offsets) {
      for (let dz of offsets) {
        if ((x + dx) ** 2 + (y + dy) ** 2 + (z + dz) ** 2 < r2) {
          hits++;
        }
      }
    }
  }
  if (hits === 27) {
    return 'black';
  }
  if (hits > 13) {
    return 'grey';
  }
  return 'white';
}


level.addEventListener('input', () => draw(+level.value));

draw(+level.value);
level.focus();
