import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type GravityMode = 'zero-g' | 'repel' | 'orbit';

interface AntiGravitySceneProps {
  gravityMode: GravityMode;
  isMotionPaused: boolean;
  onBlackHoleStateChange?: (active: boolean) => void;
}

interface FloatingBody {
  mesh: THREE.Mesh;
  kind: 'capsule' | 'diamond' | 'gold-droplet' | 'neon-ring';
  homeX: number;
  homeY: number;
  homeZ: number;
  vx: number;
  vy: number;
  vz: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  driftSpeed: number;
  phase: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  baseScale: number;
}

export const AntiGravityScene: React.FC<AntiGravitySceneProps> = ({
  gravityMode,
  isMotionPaused,
  onBlackHoleStateChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<GravityMode>(gravityMode);
  const pausedRef = useRef<boolean>(isMotionPaused);

  useEffect(() => {
    modeRef.current = gravityMode;
  }, [gravityMode]);

  useEffect(() => {
    pausedRef.current = isMotionPaused;
  }, [isMotionPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const OBJECT_COUNT = isMobile ? 18 : 32;

    // Scene setup with transparent canvas (alpha: true)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio & Cosmic Luxury Lighting
    const ambientLight = new THREE.AmbientLight(0x2a1b4e, 2.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 45, 45, 1.5);
    cyanLight.position.set(-10, 8, 10);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff2a85, 42, 45, 1.5);
    magentaLight.position.set(10, -6, 9);
    scene.add(magentaLight);

    const goldLight = new THREE.PointLight(0xf5d08a, 38, 40, 1.4);
    goldLight.position.set(0, 10, 12);
    scene.add(goldLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(4, 12, 8);
    scene.add(rimLight);

    // Shared High-Luxury Materials
    // 1. Iridescent Nail-Art Capsule Material
    const capsuleMatCyan = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#23153C'),
      emissive: new THREE.Color('#00E5FF'),
      emissiveIntensity: 0.18,
      metalness: 0.35,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      iridescence: 1.0,
      iridescenceIOR: 1.4,
      reflectivity: 1.0,
    });

    const capsuleMatMagenta = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#351238'),
      emissive: new THREE.Color('#FF2A85'),
      emissiveIntensity: 0.22,
      metalness: 0.4,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      iridescence: 0.95,
      iridescenceIOR: 1.5,
      reflectivity: 1.0,
    });

    // 2. Faceted Diamond Crystal Material
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E0FBFF'),
      emissive: new THREE.Color('#00E5FF'),
      emissiveIntensity: 0.2,
      metalness: 0.15,
      roughness: 0.05,
      transmission: 0.55,
      thickness: 1.2,
      ior: 2.4,
      clearcoat: 1.0,
      flatShading: true,
    });

    // 3. Liquid Gold Droplet Material
    const goldDropletMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F5D08A'),
      emissive: new THREE.Color('#8A5A10'),
      emissiveIntensity: 0.25,
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // 4. Glowing Neon Ring Materials
    const neonCyanRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00E5FF'),
      emissive: new THREE.Color('#00E5FF'),
      emissiveIntensity: 0.85,
      metalness: 0.5,
      roughness: 0.2,
    });

    const neonMagentaRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF2A85'),
      emissive: new THREE.Color('#FF2A85'),
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
    });

    const neonGoldRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F5D08A'),
      emissive: new THREE.Color('#F5D08A'),
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.18,
    });

    // Geometries
    const capsuleGeo = new THREE.CapsuleGeometry(0.28, 0.68, 12, 24);
    const diamondGeo = new THREE.OctahedronGeometry(0.52, 0);
    const dropletGeo = new THREE.SphereGeometry(0.38, 28, 28);
    // Taper droplet slightly for luxury liquid-gold look
    const posAttr = dropletGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      if (y > 0) {
        const taper = 1 - y * 0.45;
        posAttr.setX(i, posAttr.getX(i) * taper);
        posAttr.setZ(i, posAttr.getZ(i) * taper);
        posAttr.setY(i, y * 1.25);
      }
    }
    dropletGeo.computeVertexNormals();

    const ringGeo = new THREE.TorusGeometry(0.52, 0.055, 16, 48);

    // Create 25-35 floating 3D objects
    const bodies: FloatingBody[] = [];
    const kinds: FloatingBody['kind'][] = [
      'capsule',
      'diamond',
      'gold-droplet',
      'neon-ring',
    ];

    const spreadX = isMobile ? 11 : 22;
    const spreadY = 16;

    for (let i = 0; i < OBJECT_COUNT; i++) {
      const kind = kinds[i % kinds.length];
      let mesh: THREE.Mesh;

      if (kind === 'capsule') {
        mesh = new THREE.Mesh(
          capsuleGeo,
          i % 2 === 0 ? capsuleMatCyan : capsuleMatMagenta
        );
      } else if (kind === 'diamond') {
        mesh = new THREE.Mesh(diamondGeo, diamondMaterial);
      } else if (kind === 'gold-droplet') {
        mesh = new THREE.Mesh(dropletGeo, goldDropletMaterial);
      } else {
        const ringMat =
          i % 3 === 0
            ? neonCyanRingMat
            : i % 3 === 1
            ? neonMagentaRingMat
            : neonGoldRingMat;
        mesh = new THREE.Mesh(ringGeo, ringMat);
      }

      const homeX = (Math.random() - 0.5) * spreadX;
      const homeY = (Math.random() - 0.5) * spreadY;
      const homeZ = (Math.random() - 0.5) * 9 - 1.5;

      const baseScale = 0.65 + Math.random() * 0.65;
      mesh.scale.setScalar(baseScale);
      mesh.position.set(homeX, homeY, homeZ);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      scene.add(mesh);

      const distFromCenter = Math.hypot(homeX, homeY) + 1.5;
      bodies.push({
        mesh,
        kind,
        homeX,
        homeY,
        homeZ,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        vz: 0,
        rotSpeedX: (Math.random() - 0.5) * 0.014,
        rotSpeedY: (Math.random() - 0.5) * 0.018,
        rotSpeedZ: (Math.random() - 0.5) * 0.012,
        driftSpeed: 0.008 + Math.random() * 0.014,
        phase: Math.random() * Math.PI * 2,
        orbitRadius: distFromCenter,
        orbitAngle: Math.atan2(homeY, homeX),
        orbitSpeed: (0.003 + Math.random() * 0.005) * (i % 2 === 0 ? 1 : -1),
        baseScale,
      });
    }

    // Ambient Zero-G Starfield / Shimmer Dust
    const particleCount = isMobile ? 70 : 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.07,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Interactive Cursor Forcefield Visual Ring
    const cursorRingGeo = new THREE.RingGeometry(0.45, 0.52, 48);
    const cursorRingMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const cursorRing = new THREE.Mesh(cursorRingGeo, cursorRingMat);
    scene.add(cursorRing);

    // Cursor & Black-Hole State
    const pointerWorld = new THREE.Vector3(0, 0, 0);
    const prevPointerWorld = new THREE.Vector3(0, 0, 0);
    let pointerActive = false;
    let pointerVelocity = 0;
    let isBlackHoleActive = false;
    let shockwavePulse = 0;

    const updatePointerWorld = (clientX: number, clientY: number) => {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      prevPointerWorld.copy(pointerWorld);
      pointerWorld.copy(pos);
      pointerVelocity = Math.min(pointerWorld.distanceTo(prevPointerWorld), 1.8);
      pointerActive = true;
    };

    const handlePointerMove = (e: MouseEvent) => {
      updatePointerWorld(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerWorld(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Do not hijack clicks on interactive form controls or buttons, but still trigger physics!
      updatePointerWorld(e.clientX, e.clientY);
      isBlackHoleActive = true;
      onBlackHoleStateChange?.(true);
    };

    const handlePointerUp = () => {
      if (isBlackHoleActive) {
        isBlackHoleActive = false;
        onBlackHoleStateChange?.(false);
        shockwavePulse = 1.0;

        // Release floating gems in a weightless 360-degree burst!
        for (const b of bodies) {
          const dx = b.mesh.position.x - pointerWorld.x;
          const dy = b.mesh.position.y - pointerWorld.y;
          const dz = b.mesh.position.z - pointerWorld.z;
          const dist = Math.hypot(dx, dy) + 0.1;
          if (dist < 9.5) {
            const burstStrength = ((9.5 - dist) / 9.5) * 0.36 + 0.12;
            b.vx += (dx / dist) * burstStrength + (Math.random() - 0.5) * 0.08;
            b.vy += (dy / dist) * burstStrength + (Math.random() - 0.5) * 0.08;
            b.vz += (dz / (Math.abs(dz) + 1)) * 0.12;
          }
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('mouseup', handlePointerUp, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Pause physics loop when browser tab is hidden
    let isTabHidden = document.hidden;
    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let reqId = 0;
    let clock = 0;

    // Render single static frame if reduced motion is preferred
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    }

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (isTabHidden || pausedRef.current || prefersReducedMotion) {
        return;
      }

      clock += 0.016;
      const currentMode = modeRef.current;

      // Update cursor ring visual
      if (pointerActive) {
        cursorRing.position.set(pointerWorld.x, pointerWorld.y, 1.5);
        if (isBlackHoleActive) {
          cursorRingMat.color.setHex(0xff2a85);
          cursorRingMat.opacity = 0.65;
          const pulseScale = 1.4 + Math.sin(clock * 14) * 0.35;
          cursorRing.scale.setScalar(pulseScale);
        } else if (shockwavePulse > 0.01) {
          cursorRingMat.color.setHex(0xf5d08a);
          cursorRingMat.opacity = shockwavePulse * 0.75;
          cursorRing.scale.setScalar(1 + (1 - shockwavePulse) * 7.5);
          shockwavePulse *= 0.9;
        } else {
          cursorRingMat.color.setHex(0x00e5ff);
          cursorRingMat.opacity = Math.min(pointerVelocity * 0.45, 0.38);
          cursorRing.scale.setScalar(1 + pointerVelocity * 1.6);
        }
      }

      pointerVelocity *= 0.9;

      const boundY = 9.5;
      const boundX = isMobile ? 6.5 : 12.5;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const pos = b.mesh.position;

        // 1. Base Mode Physics
        if (currentMode === 'zero-g') {
          // Gentle upward zero-gravity drift + sine-wave horizontal float
          pos.y += b.driftSpeed;
          b.homeY += b.driftSpeed;
          if (b.homeY > boundY) {
            b.homeY = -boundY;
            pos.y = -boundY;
          }

          const targetX = b.homeX + Math.sin(clock * 1.1 + b.phase) * 0.45;
          const targetY = b.homeY + Math.cos(clock * 0.9 + b.phase) * 0.35;
          const targetZ = b.homeZ + Math.sin(clock * 0.7 + b.phase) * 0.4;

          b.vx += (targetX - pos.x) * 0.012;
          b.vy += (targetY - pos.y) * 0.012;
          b.vz += (targetZ - pos.z) * 0.012;
        } else if (currentMode === 'repel') {
          // High-buoyancy anti-gravity suspension with stronger elastic tether
          pos.y += b.driftSpeed * 0.65;
          b.homeY += b.driftSpeed * 0.65;
          if (b.homeY > boundY) {
            b.homeY = -boundY;
            pos.y = -boundY;
          }
          const targetX = b.homeX + Math.sin(clock * 1.5 + b.phase) * 0.65;
          const targetY = b.homeY + Math.cos(clock * 1.3 + b.phase) * 0.55;
          const targetZ = b.homeZ;

          b.vx += (targetX - pos.x) * 0.016;
          b.vy += (targetY - pos.y) * 0.016;
          b.vz += (targetZ - pos.z) * 0.016;
        } else if (currentMode === 'orbit') {
          // Celestial Zero-G Vortex Orbit around cursor (if active) or center
          b.orbitAngle += b.orbitSpeed * 1.6;
          const centerX = pointerActive ? pointerWorld.x * 0.35 : 0;
          const centerY = pointerActive ? pointerWorld.y * 0.35 : 0;
          const targetX = centerX + Math.cos(b.orbitAngle) * b.orbitRadius;
          const targetY = centerY + Math.sin(b.orbitAngle) * (b.orbitRadius * 0.68);
          const targetZ = b.homeZ + Math.sin(b.orbitAngle * 2 + b.phase) * 1.2;

          b.vx += (targetX - pos.x) * 0.022;
          b.vy += (targetY - pos.y) * 0.022;
          b.vz += (targetZ - pos.z) * 0.022;
        }

        // 2. Cursor Forcefield Interaction (Repulsion Shockwave vs Magnetic Black-Hole Pull)
        if (pointerActive) {
          const dx = pos.x - pointerWorld.x;
          const dy = pos.y - pointerWorld.y;
          const dist = Math.hypot(dx, dy) + 0.001;

          if (isBlackHoleActive) {
            // Magnetic Black-Hole Pull: draws floating gems toward the cursor with swirl
            const pullRadius = 11.0;
            if (dist < pullRadius && dist > 0.45) {
              const pullFactor = ((pullRadius - dist) / pullRadius) * 0.055;
              // Centripetal pull + tangential swirl
              b.vx -= (dx / dist) * pullFactor + (dy / dist) * pullFactor * 0.45;
              b.vy -= (dy / dist) * pullFactor - (dx / dist) * pullFactor * 0.45;
              b.vz += (1.8 - pos.z) * 0.025;
            }
          } else {
            // Smooth 360-degree Anti-Gravity Shockwave Repulsion
            const repelRadius = currentMode === 'repel' ? 6.8 : 4.8;
            if (dist < repelRadius) {
              const force = Math.pow((repelRadius - dist) / repelRadius, 2);
              const boost =
                currentMode === 'repel'
                  ? 0.085 + pointerVelocity * 0.06
                  : 0.048 + pointerVelocity * 0.045;
              b.vx += (dx / dist) * force * boost;
              b.vy += (dy / dist) * force * boost;
              b.vz += force * 0.03;
            }
          }
        }

        // Apply damping & velocity
        b.vx *= 0.91;
        b.vy *= 0.91;
        b.vz *= 0.9;

        pos.x += b.vx;
        pos.y += b.vy;
        pos.z += b.vz;

        // Soft horizontal wrap guard
        if (pos.x > boundX + 4) pos.x = -boundX - 2;
        if (pos.x < -boundX - 4) pos.x = boundX + 2;

        // 3. Weightless 3D Rotation (accelerates slightly when energized)
        const speedMultiplier = isBlackHoleActive ? 2.8 : 1.0 + Math.hypot(b.vx, b.vy) * 4;
        b.mesh.rotation.x += b.rotSpeedX * speedMultiplier;
        b.mesh.rotation.y += b.rotSpeedY * speedMultiplier;
        b.mesh.rotation.z += b.rotSpeedZ * speedMultiplier;
      }

      // Gently drift ambient star-dust upward
      particleSystem.rotation.y = Math.sin(clock * 0.15) * 0.08;
      particleSystem.position.y = ((clock * 0.25) % 4) - 2;

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
    };
  }, [onBlackHoleStateChange]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
