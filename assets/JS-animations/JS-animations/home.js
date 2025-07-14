function create3DCube(containerId, rotateX = 0.01, rotateY = 0.01, float = true, phase = 0) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const container = document.getElementById(containerId);
    container.appendChild(renderer.domElement);

    // Cube geometry
    const geometry = new THREE.BoxGeometry(3, 3, 3);

    // Visually stunning material
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xD1FF16,
        metalness: 1,
        roughness: 0.95,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        emissive: 0xD1FF16,
        emissiveIntensity: 0.6
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(6, 10, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);

    // Ground plane to catch shadows (transparent)
    const groundMaterial = new THREE.ShadowMaterial({
        opacity: 0.25
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle environment fog
    scene.fog = new THREE.FogExp2(0x111111, 0.03);

    let time = phase;

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += rotateX;
        cube.rotation.y += rotateY;

        if (float) {
            time += 0.01;
            const height = Math.abs(Math.sin(time)) * 2.5;
            cube.position.y = height - 0.75;
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Left and Right cubes with phase-shifted float motion
create3DCube('three-cube-left', 0.01, 0.01, true, 0);
create3DCube('three-cube-right', -0.01, -0.01, true, Math.PI);


// *********************** ABOUT US SECTION *********************************
gsap.registerPlugin(ScrollTrigger);

const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-about-bg",
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
    }
});

aboutTimeline
    .to(".about-title-strip", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    })

    .to(".about-container", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6")

    .to(".about-desc", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")

    .to(".about-cards", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")

    .to(".about-right", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

// Force recalculation
ScrollTrigger.refresh();

// ******************CEFE VIBES **********************************
gsap.registerPlugin(ScrollTrigger);

const cafeTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".cafe-vibes-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate image wrappers with float-up + subtle rotation
cafeTimeline.from(".img-wrapper", {
        opacity: 0,
        y: 80,
        rotationZ: 5,
        scale: 0.85,
        stagger: {
            each: 0.2,
            from: "center"
        },
        duration: 1.2,
        ease: "power4.out"
    })

    // Animate the title with bounce scale
    .from(".content .title", {
        opacity: 0,
        scale: 0.7,
        y: -40,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=1.2")

    // Animate the description with smooth fade-in from below
    .from(".content .desc", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")

    // Animate the button with elastic pop
    .from(".reserve-btn", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.6")

    // Floating icons with upward motion + fade
    .from(".icon", {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 1.2,
        ease: "expo.out",
        stagger: {
            each: 0.2,
            from: "edges"
        }
    }, "-=1.4");

// **************************************** GAME ZONE **************************************************
$(document).ready(function() {
    $('.gamezone-carousel').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        arrows: true,
        dots: true,
        autoPlay: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '0px'
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '0px'
                }
            }
        ]
    });
});
// gsap.registerPlugin(ScrollTrigger);

// gsap.from(".gamezone-title", {
//   scrollTrigger: {
//     trigger: ".gamezone-title",
//     start: "top 80%"
//   },
//   y: 50,
//   opacity: 0,
//   duration: 1,
//   ease: "power2.out"
// });

// gsap.from(".gamezone-subtitle", {
//   scrollTrigger: {
//     trigger: ".gamezone-subtitle",
//     start: "top 85%"
//   },
//   y: 40,
//   opacity: 0,
//   duration: 0.8,
//   ease: "power2.out"
// });

// gsap.from(".gamezone-actions", {
//   scrollTrigger: {
//     trigger: ".gamezone-actions",
//     start: "top 90%"
//   },
//   y: 30,
//   opacity: 0,
//   duration: 1,
//   ease: "back.out(1.7)"
// });

gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
        scrollTrigger: {
            trigger: ".gamezone-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    })
    .from(".gamezone-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out"
    })
    .from(".gamezone-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")
    .from(".gamezone-carousel", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6")
    .from(".gamezone-actions a", {
        opacity: 1,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.8");


// ********************** LOCATION SECTION ****************