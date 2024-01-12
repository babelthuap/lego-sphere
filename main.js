const OFFSETS = [-1 / 2, -3 / 8, -1 / 4, -1 / 8, 0, 1 / 8, 1 / 4, 3 / 8, 1 / 2];
const CUTOFF = (OFFSETS.length ** 3) / 2;

function draw() {
  console.time('draw');

  const [voxelWidth, voxelHeight] = getAspectRatio();

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

  function shade(x, y, z) {
    let count = 0;
    for (let dx of OFFSETS) {
      dx *= voxelWidth;
      for (let dy of OFFSETS) {
        dy *= voxelWidth;
        for (let dz of OFFSETS) {
          dz *= voxelHeight;
          if ((x + dx) ** 2 + (y + dy) ** 2 + (z + dz) ** 2 <= r2) {
            count++;
            if (count > CUTOFF) {
              return 'black';
            }
          }
        }
      }
    }
    return 'white';
  }

  console.timeEnd('draw');
}

// width x height
function getAspectRatio() {
  switch (aspectRatioInput.value) {
    case 'lego':
      return [5, 3];
    case 'cube':
      return [1, 1];
  }
}

diameterInput.addEventListener('input', draw);
aspectRatioInput.addEventListener('input', draw);
layerInput.addEventListener('input', draw);

draw();
layerInput.focus();
