import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  // Hash function for pattern generation
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Simplex noise variant
  float noise(vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x); 
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  void main() {
    float n = noise(vPosition.xy * 2.0 + uTime * 0.5);
    float pulse = sin(uTime * 0.8 + length(vPosition) * 1.9 + n * 2.0) * 0.5 + 0.5;
    
    vec3 color1 = vec3(1.2, 0.9, 0.2); // Intensified Gold
    vec3 color2 = vec3(0.0, 1.5, 1.8); // Intensified Cyber Blue
    
    vec3 finalColor = mix(color1, color2, pulse);
    
    // Scanline/Energy Grid effect
    float grid = abs(sin(vPosition.y * 10.0 + uTime * 2.0)) * 0.3;
    finalColor += color2 * grid;
    
    float alpha = 0.4 + 0.3 * sin(uTime + vPosition.y * 5.0 + n);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export const Source = () => {
    const meshRef = useRef<THREE.Mesh>(null!)
    const materialRef = useRef<THREE.ShaderMaterial>(null!)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), [])

    useFrame((state) => {
        const { clock } = state
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
        meshRef.current.rotation.z = clock.getElapsedTime() * 0.2
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <dodecahedronGeometry args={[1.5, 0]} />
                    <shaderMaterial
                        ref={materialRef}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        transparent={true}
                        side={THREE.DoubleSide}
                        uniforms={uniforms}
                    />
                </mesh>
            </Float>

            {/* Müddessir / 19 Holografik Metinler */}
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.2}
                color="#ffd700"
                anchorX="center"
                anchorY="middle"
            >
                OVER IT ARE NINETEEN
            </Text>

            <Text
                position={[0, -2.5, 0]}
                fontSize={0.15}
                color="#00f2ff"
                maxWidth={4}
                textAlign="center"
            >
                "Alayha Tis'ata 'Ashar"
            </Text>
        </group>
    )
}
