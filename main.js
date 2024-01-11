const voxelWidth = 5;
const voxelHeight = 3;

function draw() {
  console.time('draw');

  const d = (+diameterInput.value) * voxelWidth;
  const r = d / 2;
  const r2 = r * r;

  const layer = +layerInput.value;
  const z = -r + (layer + 0.5) * voxelHeight;

  grid.innerHTML = '';
  for (let row = 0; row < d / voxelWidth; row++) {
    const y = -r + (row + 0.5) * voxelWidth;
    const tr = document.createElement('tr');
    for (let col = 0; col < d / voxelWidth; col++) {
      const x = -r + (col + 0.5) * voxelWidth;
      const td = document.createElement('td');
      td.style.backgroundColor = shade(x, y, z, r2);
      tr.appendChild(td);
    }
    grid.appendChild(tr);
  }

  console.timeEnd('draw');
}

const offsets = [-1 / 2, -3 / 8, -1 / 4, -1 / 8, 0, 1 / 8, 1 / 4, 3 / 8, 1 / 2];
function shade(x, y, z, r2) {
  let count = 0;
  for (let dx of offsets) {
    dx *= voxelWidth;
    for (let dy of offsets) {
      dy *= voxelWidth;
      for (let dz of offsets) {
        dz *= voxelHeight;
        if ((x + dx) ** 2 + (y + dy) ** 2 + (z + dz) ** 2 <= r2) {
          count++;
          if (count > (offsets.length ** 3) / 2) {
            return 'black';
          }
        }
      }
    }
  }
  return 'white';
}


diameterInput.addEventListener('input', draw);
layerInput.addEventListener('input', draw);

draw();
layerInput.focus();
