import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CosmicBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.z = 18;

    const pointer = new THREE.Vector2(0, 0);
    const group = new THREE.Group();
    scene.add(group);

    const starCount = 900;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 46;
      positions[i3 + 1] = (Math.random() - 0.5) * 26;
      positions[i3 + 2] = (Math.random() - 0.5) * 26;

      const cool = Math.random();
      colors[i3] = 0.55 + cool * 0.45;
      colors[i3 + 1] = 0.72 + cool * 0.26;
      colors[i3 + 2] = 0.95;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        depthWrite: false
      })
    );
    group.add(stars);

    const linePositions: number[] = [];
    for (let i = 0; i < 32; i += 1) {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 17;
      const z = -5 - Math.random() * 12;
      linePositions.push(x, y, z, x + Math.random() * 2.2, y + Math.random() * 1.2, z);
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const constellations = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0x7bdcff, transparent: true, opacity: 0.16 })
    );
    group.add(constellations);

    const blackHole = new THREE.Group();
    blackHole.position.set(0, 0, -7);
    group.add(blackHole);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x02030a, transparent: true, opacity: 0.94 })
    );
    blackHole.add(core);

    const diskMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x62d8ff, transparent: true, opacity: 0.22, depthWrite: false }),
      new THREE.MeshBasicMaterial({ color: 0xf1b65a, transparent: true, opacity: 0.18, depthWrite: false }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false })
    ];

    [2.15, 2.85, 3.45].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.035 + index * 0.012, 16, 144), diskMaterials[index]);
      ring.rotation.x = 1.22;
      ring.rotation.z = index * 0.35;
      blackHole.add(ring);
    });

    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(2.7, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x55cfff, transparent: true, opacity: 0.055, depthWrite: false })
    );
    blackHole.add(aura);

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      stars.rotation.y = t * 0.012 + pointer.x * 0.08;
      stars.rotation.x = pointer.y * 0.045;
      constellations.rotation.y = -t * 0.01;
      blackHole.rotation.z = t * 0.08;
      blackHole.rotation.x = 0.05 + pointer.y * 0.12;
      blackHole.rotation.y = pointer.x * 0.18;
      group.position.x += (pointer.x * 0.8 - group.position.x) * 0.035;
      group.position.y += (-pointer.y * 0.55 - group.position.y) * 0.035;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      starGeometry.dispose();
      lineGeometry.dispose();
      diskMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={hostRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(40,58,82,0.24),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(96,219,255,0.16),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(255,185,96,0.1),transparent_22%),#03040a]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,4,10,0.26)_58%,rgba(3,4,10,0.86)_100%)]" />
    </div>
  );
}
