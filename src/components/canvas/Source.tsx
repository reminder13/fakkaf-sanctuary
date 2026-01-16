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
  
  void main() {
    // 19 Algoritması görsel temsili: Periyodik ışık dalgaları
    float pulse = sin(uTime * 0.5 + length(vPosition) * 1.9) * 0.5 + 0.5;
    vec3 color1 = vec3(1.0, 0.84, 0.0); // Gold
    vec3 color2 = vec3(0.0, 0.95, 1.0); // Cyber Blue
    
    vec3 finalColor = mix(color1, color2, pulse);
    float alpha = 0.3 + 0.2 * sin(uTime + vPosition.y * 10.0);
    
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
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_eeA.woff"
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
