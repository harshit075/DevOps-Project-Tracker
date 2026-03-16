'use client'

import { useEffect, useRef } from 'react'

export default function PipelineAnimation3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let animationId: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scene: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let camera: any

    const init = async () => {
      const THREE = await import('three')

      const width = mountRef.current!.clientWidth
      const height = mountRef.current!.clientHeight

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.set(0, 0, 18)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mountRef.current!.appendChild(renderer.domElement)

      const nodePositions = [
        new THREE.Vector3(-8, 3, -2),
        new THREE.Vector3(-4, -2, 1),
        new THREE.Vector3(0, 4, -3),
        new THREE.Vector3(4, -1, 2),
        new THREE.Vector3(8, 2, -1),
        new THREE.Vector3(-6, 0, 3),
        new THREE.Vector3(2, -3, -2),
        new THREE.Vector3(6, -3, 1),
        new THREE.Vector3(-2, 2, 2),
        new THREE.Vector3(3, 3, -4),
        new THREE.Vector3(-5, -3, -1),
        new THREE.Vector3(7, 1, 3),
      ]

      const nodeColors = [0x3b82f6, 0x10b981, 0x8b5cf6, 0xf59e0b, 0xef4444, 0x06b6d4]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes: any[] = []
      const nodeSpeeds: { x: number; y: number; z: number }[] = []

      nodePositions.forEach((pos, i) => {
        const geometry = new THREE.SphereGeometry(0.25, 16, 16)
        const material = new THREE.MeshBasicMaterial({
          color: nodeColors[i % nodeColors.length],
          transparent: true,
          opacity: 0.9,
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.copy(pos)
        scene.add(sphere)
        nodes.push(sphere)

        const ringGeometry = new THREE.RingGeometry(0.35, 0.45, 16)
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: nodeColors[i % nodeColors.length],
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.position.copy(pos)
        scene.add(ring)

        nodeSpeeds.push({
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.004,
        })
      })

      const connectionPairs: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 1], [2, 8], [8, 6],
        [3, 9], [4, 7], [6, 7], [9, 4], [10, 1], [11, 4], [5, 10], [8, 3],
      ]

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connections: any[] = []
      connectionPairs.forEach(([a, b]) => {
        const points = [nodes[a].position.clone(), nodes[b].position.clone()]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.2,
        })
        const line = new THREE.Line(geometry, material)
        scene.add(line)
        connections.push(line)
      })

      const particleCount = 120
      const particlePositions = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 30
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }
      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x4f72d8,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
      })
      const particles = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particles)

      let time = 0

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        time += 0.01

        nodes.forEach((node, i) => {
          node.position.x += nodeSpeeds[i].x
          node.position.y += nodeSpeeds[i].y
          node.position.z += nodeSpeeds[i].z

          if (Math.abs(node.position.x) > 10) nodeSpeeds[i].x *= -1
          if (Math.abs(node.position.y) > 6) nodeSpeeds[i].y *= -1
          if (Math.abs(node.position.z) > 5) nodeSpeeds[i].z *= -1

          node.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.1)
        })

        connectionPairs.forEach(([a, b], idx) => {
          const positions = new Float32Array([
            nodes[a].position.x, nodes[a].position.y, nodes[a].position.z,
            nodes[b].position.x, nodes[b].position.y, nodes[b].position.z,
          ])
          connections[idx].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          connections[idx].geometry.attributes.position.needsUpdate = true

          const dist = nodes[a].position.distanceTo(nodes[b].position)
          connections[idx].material.opacity = Math.max(0, 0.3 - dist * 0.018)
        })

        particles.rotation.y = time * 0.03
        scene.rotation.y = Math.sin(time * 0.1) * 0.05

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        if (!mountRef.current) return
        const w = mountRef.current.clientWidth
        const h = mountRef.current.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })

    return () => {
      cancelAnimationFrame(animationId)
      cleanup?.()
      if (renderer) renderer.dispose()
      if (mountRef.current && renderer?.domElement) {
        try { mountRef.current.removeChild(renderer.domElement) } catch (_e) { /* DOM cleanup: element may have already been removed */ }
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
