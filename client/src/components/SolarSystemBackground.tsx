import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Planet } from '../types/astronautTypes';

const rotationSpeeds: { [key: string]: number } = {
  Sun: 0.0005,
  Mercury: 0.0001,
  Venus: -0.00005,
  Earth: 0.01,
  Mars: 0.0098,
  Jupiter: 0.025,
  Saturn: 0.023,
  Uranus: -0.014,
  Neptune: 0.015,
};
  

const SolarSystemBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMountRef = mountRef.current;
    const planets: Planet[] = [
      {
        name: 'Mercury',
        radius: 1,
        distance: 15,
        texture: '/textures/mercury.jpg',
        orbitSpeed: 0.02,
      },
      {
        name: 'Venus',
        radius: 1.8,
        distance: 22,
        texture: '/textures/venus.jpg',
        orbitSpeed: 0.015,
      },
      {
        name: 'Earth',
        radius: 2,
        distance: 30,
        texture: '/textures/earth.jpg',
        orbitSpeed: 0.01,
        moons: [
          { name: 'Moon', radius: 0.4, distance: 4, orbitSpeed: 0.05 },
        ],
      },
      {
        name: 'Mars',
        radius: 1.6,
        distance: 40,
        texture: '/textures/mars.jpg',
        orbitSpeed: 0.008,
      },
      {
        name: 'Jupiter',
        radius: 6,
        distance: 55,
        texture: '/textures/jupiter.jpg',
        orbitSpeed: 0.004,
        moons: [
          { name: 'Io', radius: 0.6, distance: 8, orbitSpeed: 0.03 }, 
          { name: 'Europa', radius: 0.5, distance: 12, orbitSpeed: 0.02 }, 
        ],
      },
      {
        name: 'Saturn',
        radius: 5,
        distance: 75,
        texture: '/textures/saturn.jpg',
        orbitSpeed: 0.003,
        rings: { innerRadius: 6, outerRadius: 10 },
      },
      {
        name: 'Uranus',
        radius: 4,
        distance: 90,
        texture: '/textures/uranus.jpg',
        orbitSpeed: 0.002,
      },
      {
        name: 'Neptune',
        radius: 3.6,
        distance: 105,
        texture: '/textures/neptune.jpg',
        orbitSpeed: 0.001,
      },
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3500
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (currentMountRef) {
      currentMountRef.appendChild(renderer.domElement);
    }

    camera.position.set(0, 100, 100);
    camera.lookAt(0, 0, 0);

    const sunGeometry = new THREE.SphereGeometry(10, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/textures/sun.jpg'),
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const planetMeshes: Planet[] = [];
    planets.forEach((planet) => {
      const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(planet.texture),
      });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      planetMesh.position.x = planet.distance;
      planet.mesh = planetMesh;
      planetMeshes.push(planet);
      scene.add(planetMesh);


      if (planet.rings) {
        const ringGroup = new THREE.Group();
      
        const ringColors = [
          { inner: 6.0, outer: 7.0, color: 0xd6d1cc, opacity: 0.8 },
          { inner: 7.0, outer: 8.0, color: 0xb3aea9, opacity: 0.7 },
          { inner: 8.0, outer: 9.0, color: 0x8f8a85, opacity: 0.6 },
          { inner: 9.0, outer: 10.0, color: 0x6b6763, opacity: 0.5 },
        ];
      
        ringColors.forEach((ring) => {
          const ringGeometry = new THREE.RingGeometry(ring.inner, ring.outer, 64);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: ring.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: ring.opacity,
          });
          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          ringMesh.rotation.x = Math.PI / 2;
          ringGroup.add(ringMesh);
        });
      
        ringGroup.position.set(0, 0, 0);
        planet.mesh!.add(ringGroup);
      }
      
      
      if (planet.moons) {
        planet.moons.forEach((moon) => {
          const moonGeometry = new THREE.SphereGeometry(moon.radius, 32, 32);
          const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
          const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
          moonMesh.position.x = planet.distance + moon.distance;
          moon.mesh = moonMesh;
          moon.angle = 0;
          scene.add(moonMesh);
        });
      }
    });

    const pointLight = new THREE.PointLight(0xffffff, 1000, 1000);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.015);
    scene.add(ambientLight);

    scene.background = new THREE.Color(0x000000);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      sizeAttenuation: true,
    });

    const starVertices: number[] = [];
    for (let i = 0; i < 5000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 8000,
        (Math.random() - 0.5) * 8000,
        (Math.random() - 0.5) * 8000
      );
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);

    scene.add(stars);


    const animate = () => {

          
      requestAnimationFrame(animate);
      

      sun.rotation.y += rotationSpeeds['Sun'];
      
      planetMeshes.forEach((planet) => {

        planet.angle = (planet.angle || 0) + planet.orbitSpeed;
      
          planet.mesh!.position.x = planet.distance * Math.cos(planet.angle);
          planet.mesh!.position.z = planet.distance * Math.sin(planet.angle);
      
          planet.mesh!.rotation.y += rotationSpeeds[planet.name] || 0.01;
      
          planet.moons?.forEach((moon) => {
            moon.angle = (moon.angle || 0) + moon.orbitSpeed;
            moon.mesh!.position.x =
              planet.mesh!.position.x + moon.distance * Math.cos(moon.angle);
            moon.mesh!.position.z =
              planet.mesh!.position.z + moon.distance * Math.sin(moon.angle);
          });
      });
      
      renderer.render(scene, camera);
    };
      
  
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className='background-canvas' ref={mountRef}></div>;
};

export default SolarSystemBackground;
