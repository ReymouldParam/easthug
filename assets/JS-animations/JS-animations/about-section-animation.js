import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

let scene, camera, renderer, arrow, clock;

function initCafeArrow() {
  const canvas = document.getElementById('cafeCanvas');
  const section = document.querySelector('.cafe-vibes-section');
  const width = section.offsetWidth;
  const height = section.offsetHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const loader = new THREE.TextureLoader();
  loader.load('assets/images/OBJECTS.png', (texture) => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    arrow = new THREE.Mesh(geometry, material);
    scene.add(arrow);
  });

  clock = new THREE.Clock();
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();
  if (arrow) {
    arrow.position.x = Math.sin(t * 0.5) * 5;
    arrow.position.y = Math.cos(t * 0.4) * 3;
    arrow.rotation.z = t;
  }

  renderer.render(scene, camera);
}

window.addEventListener('load', initCafeArrow);
// **************************************************************** GAME ZONE *********************************
function createImageArrow(containerId, imagePath, direction = 'left') {
  const container = document.getElementById(containerId);

  const width = container.offsetWidth || 600;
  const height = container.offsetHeight || 400;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load(
    imagePath,
    (texture) => {
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      // 👇 Make arrow large
      const geometry = new THREE.PlaneGeometry(7, 9);
      const mesh = new THREE.Mesh(geometry, material);

      // Flip if right arrow
      if (direction === 'right') {
        mesh.rotation.y = Math.PI;
      }

      scene.add(mesh);

      scene.add(new THREE.AmbientLight(0xffffff, 1.4));

      const directional = new THREE.DirectionalLight(0xffffff, 1);
      directional.position.set(3, 3, 3);
      scene.add(directional);

      // ✅ Animate floating, rotating, and y-axis bounce
      let t = 0;
      function animate() {
        requestAnimationFrame(animate);
        t += 0.03;

        // Floating: slow vertical up-down movement
        mesh.position.y = direction === 'left'
          ? Math.sin(t) * 0.5
          : Math.cos(t) * 0.5;

        // Rotating arrow itself (Z-axis)
        mesh.rotation.z += 0.02;

        renderer.render(scene, camera);
      }

      animate();
    },
    undefined,
    (err) => {
      console.error(`Texture loading failed for ${containerId}:`, err);
    }
  );
}

createImageArrow('arrow-left', 'assets/images/black-arroe-shine.svg', 'left');
createImageArrow('arrow-right', 'assets/images/black-arroe-shine.svg', 'right');
// ************************************************************************************ LOCATION SECTION **************
function createDiamond(containerSelector, isMirrored = false) {
  const container = document.querySelector(containerSelector);
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Diamond: combine cylinder + inverted octahedron to simulate reflection
  const topGeometry = new THREE.CylinderGeometry(0, 1, 1.5, 6, 1);
  const bottomGeometry = new THREE.OctahedronGeometry(0.8, 0);
  bottomGeometry.rotateX(Math.PI);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.05,
    emissive: 0xaaaaaa,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide
  });

  const top = new THREE.Mesh(topGeometry, material);
  const bottom = new THREE.Mesh(bottomGeometry, material);

  top.position.y = 0.6;
  bottom.position.y = -0.7;

  const group = new THREE.Group();
  group.add(top);
  group.add(bottom);
  scene.add(group);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(1, 2, 3);
  scene.add(ambient, directional);

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.005;
    group.rotation.x += 0.002;
    renderer.render(scene, camera);
  }

  animate();
}

// Initialize both diamonds
createDiamond('.diamond-canvas.left', false);
createDiamond('.diamond-canvas.right', true);
