import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    
    // Slow fluid movement
    float t = uTime * 0.1;
    vec2 m = uMouse * 0.1;
    
    vec3 color = vec3(0.01, 0.02, 0.05); // Deep space base
    
    for(float i = 1.0; i < 4.0; i++) {
        uv += vec2(
            sin(t + uv.y * i + m.x),
            cos(t + uv.x * i + m.y)
        ) * 0.2;
        
        float dist = length(uv);
        color += vec3(0.01 / dist) * vec3(0.1, 0.4, 0.6); // Cyber blue nebula
    }
    
    // Distant gold hints
    color += vec3(0.05 * noise(uv + t)) * vec3(1.0, 0.8, 0.2);

    gl_FragColor = vec4(color, 1.0);
  }
`

export const Nebula = () => {
    const meshRef = useRef<THREE.Mesh>(null!)
    const materialRef = useRef<THREE.ShaderMaterial>(null!)
    const { size } = useThree()

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(0, 0) }
    }), [])

    useFrame((state) => {
        const { clock, mouse } = state
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
        materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y)
        materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={nebulaVertexShader}
                fragmentShader={nebulaFragmentShader}
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    )
}
