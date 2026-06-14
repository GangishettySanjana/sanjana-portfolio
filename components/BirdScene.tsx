'use client';

/**
 * BirdScene — fixed WebGL background for a Next.js portfolio.
 *
 * A small flock of low-poly paper birds flies along a 3D curve across
 * a sky + hills scene. Scroll position = how far along the curve the
 * flock has flown. Mouse adds gentle camera parallax.
 *
 * Usage (in a page or layout):
 *
 *   import dynamic from 'next/dynamic';
 *   const BirdScene = dynamic(() => import('@/components/BirdScene'), { ssr: false });
 *   ...
 *   <BirdScene />   // renders behind everything; your content needs z-index > 0
 *
 * Requires: npm install three
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ---- tweak these to match your site ----
const COLORS = {
  skyTop: '#cfe6f5',
  skyBottom: '#f2f7ee',
  fog: '#eaf2ec',
  hillNear: '#7fae7e',
  hillFar: '#a8c8a4',
  tree: '#5d8f63',
  trunk: '#7a6a55',
  bird: '#2b2b33',
  sun: '#ffe9b0',
};
const BIRD_COUNT = 7;
const CAMERA_BASE = { x: 0, y: 3, z: 14 };

export default function BirdScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- renderer / scene / camera ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(COLORS.fog), 18, 55);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(CAMERA_BASE.x, CAMERA_BASE.y, CAMERA_BASE.z);

    // ---------- sky gradient (big plane far behind everything) ----------
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 2;
    skyCanvas.height = 256;
    const sctx = skyCanvas.getContext('2d')!;
    const grad = sctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, COLORS.skyTop);
    grad.addColorStop(1, COLORS.skyBottom);
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 2, 256);
    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 90),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(skyCanvas), depthWrite: false })
    );
    sky.position.set(0, 10, -60);
    scene.add(sky);

    // soft sun disc
    const sun = new THREE.Mesh(
      new THREE.CircleGeometry(4, 40),
      new THREE.MeshBasicMaterial({ color: COLORS.sun, transparent: true, opacity: 0.9 })
    );
    sun.position.set(8, 12, -40);
    scene.add(sun);

    // ---------- hills (two rows of wide flattened cones) ----------
    function hillRow(color: string, z: number, yScale: number, count: number) {
      const group = new THREE.Group();
      for (let i = 0; i < count; i++) {
        const r = 6 + Math.random() * 6;
        const hill = new THREE.Mesh(
          new THREE.ConeGeometry(r, r * yScale, 24),
          new THREE.MeshBasicMaterial({ color })
        );
        hill.position.set(-40 + i * (80 / count) + Math.random() * 4, -4 + (r * yScale) / 2 - 2.5, z);
        group.add(hill);
      }
      return group;
    }
    scene.add(hillRow(COLORS.hillFar, -28, 0.5, 7));
    scene.add(hillRow(COLORS.hillNear, -14, 0.7, 6));

    // ---------- simple trees scattered on the near row ----------
    const trees = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const t = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.09, 0.7, 6),
        new THREE.MeshBasicMaterial({ color: COLORS.trunk })
      );
      const crown = new THREE.Mesh(
        new THREE.ConeGeometry(0.5 + Math.random() * 0.4, 1.2 + Math.random() * 0.8, 8),
        new THREE.MeshBasicMaterial({ color: COLORS.tree })
      );
      crown.position.y = 0.9;
      t.add(trunk, crown);
      t.position.set(-22 + Math.random() * 44, -3.4, -10 - Math.random() * 6);
      trees.add(t);
    }
    scene.add(trees);

    // ---------- flight path ----------
    const flightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(16, 2, 2),
      new THREE.Vector3(9, 5, -2),
      new THREE.Vector3(2, 3.5, 1),
      new THREE.Vector3(-5, 6.5, -3),
      new THREE.Vector3(-12, 4.5, 0),
      new THREE.Vector3(-19, 7.5, -4),
      new THREE.Vector3(-26, 5.5, -1),
      new THREE.Vector3(-34, 8, -5),
    ]);

    // ---------- birds: body + two flapping wing triangles ----------
    function makeBird() {
      const bird = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: COLORS.bird, side: THREE.DoubleSide });

      const body = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.5, 5), mat);
      body.rotation.z = Math.PI / 2;
      bird.add(body);

      function wing(sign: number) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            [0, 0, 0, -0.28, 0, sign * 0.55, 0.14, 0, sign * 0.4],
            3
          )
        );
        geo.computeVertexNormals();
        const w = new THREE.Mesh(geo, mat);
        w.userData.sign = sign;
        bird.add(w);
        return w;
      }
      bird.userData.wings = [wing(1), wing(-1)];
      bird.userData.flapOffset = Math.random() * Math.PI * 2;
      bird.userData.curveOffset = Math.random() * 0.025;
      bird.userData.lateral = new THREE.Vector3(
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.0,
        (Math.random() - 0.5) * 1.4
      );
      return bird;
    }
    const flock: THREE.Group[] = [];
    for (let i = 0; i < BIRD_COUNT; i++) {
      const b = makeBird();
      flock.push(b);
      scene.add(b);
    }

    // ---------- scroll + mouse state ----------
    let scrollTarget = 0;
    let scrollProgress = 0;
    const mouse = { x: 0, y: 0 };

    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      scrollTarget = max > 0 ? el.scrollTop / max : 0;
    }
    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    }
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);
    onScroll();

    // ---------- render loop ----------
    const clock = new THREE.Clock();
    let rafId = 0;
    const tmpPos = new THREE.Vector3();
    const tmpAhead = new THREE.Vector3();

    function tick() {
      const t = clock.getElapsedTime();

      scrollProgress += (scrollTarget - scrollProgress) * 0.06;
      const lead = 0.04 + scrollProgress * 0.92;

      flock.forEach((bird, i) => {
        const u = THREE.MathUtils.clamp(lead - bird.userData.curveOffset * (i + 1), 0.001, 0.999);
        flightCurve.getPointAt(u, tmpPos);
        bird.position.copy(tmpPos).add(bird.userData.lateral);
        bird.position.y += Math.sin(t * 2 + i) * 0.12;

        flightCurve.getPointAt(Math.min(0.999, u + 0.01), tmpAhead);
        bird.lookAt(tmpAhead.clone().add(bird.userData.lateral));

        const flap = Math.sin(t * 9 + bird.userData.flapOffset) * 0.9;
        bird.userData.wings.forEach((w: THREE.Mesh) => {
          w.rotation.x = flap * w.userData.sign;
        });
      });

      flightCurve.getPointAt(THREE.MathUtils.clamp(lead, 0.001, 0.999), tmpPos);
      const fx = THREE.MathUtils.lerp(CAMERA_BASE.x, tmpPos.x * 0.5, scrollProgress);
      const fy = THREE.MathUtils.lerp(CAMERA_BASE.y, 2 + tmpPos.y * 0.4, scrollProgress);
      camera.position.x += (fx + mouse.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (fy - mouse.y * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(tmpPos.x, tmpPos.y, tmpPos.z);

      renderer.render(scene, camera);
      if (!reduceMotion) rafId = requestAnimationFrame(tick);
    }
    tick();

    // ---------- cleanup ----------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshBasicMaterial;
          if (mat.map) mat.map.dispose();
          mat.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
