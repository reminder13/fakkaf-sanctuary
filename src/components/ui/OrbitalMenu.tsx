import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useSystemStore } from '../../store/useSystemStore'

interface NavNodeProps {
    label: string
    angle: number
    radius: number
    color: string
    rotationTime: number
}

const NavNode = ({ label, angle, radius, color, rotationTime }: NavNodeProps) => {
    const meshRef = useRef<THREE.Group>(null!)
    const [hovered, setHovered] = useState(false)
    const setOrbitPaused = useSystemStore((state) => state.setOrbitPaused)
    const setActiveNode = useSystemStore((state) => state.setActiveNode)
    const setMatrixActive = useSystemStore((state) => state.setMatrixActive)
    const setVaultActive = useSystemStore((state) => state.setVaultActive)

    const handleNodeClick = () => {
        setActiveNode(label)
        if (label === 'Security') setMatrixActive(true)
        if (label === 'About') setVaultActive(true)
    }

    const handleHover = (isHovered: boolean) => {
        setHovered(isHovered)
        setOrbitPaused(isHovered)
    }

    useFrame(() => {
        const currentAngle = angle + rotationTime
        meshRef.current.position.x = Math.cos(currentAngle) * radius
        meshRef.current.position.z = Math.sin(currentAngle) * radius
        meshRef.current.position.y = Math.sin(rotationTime * 2 + angle) * 0.5
    })

    return (
        <group ref={meshRef}>
            <mesh
                onClick={handleNodeClick}
                onPointerOver={() => handleHover(true)}
                onPointerOut={() => handleHover(false)}
            >
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial
                    color={hovered ? '#ffd700' : color}
                    emissive={color}
                    emissiveIntensity={hovered ? 2 : 0.5}
                />
            </mesh>

            <Text
                position={[0, 0.5, 0]}
                fontSize={0.15}
                color="white"
                fillOpacity={hovered ? 1 : 0.4}
            >
                {label.toUpperCase()}
            </Text>

            {hovered && (
                <Html distanceFactor={10}>
                    <div className="hud-panel p-2 px-4 shadow-xl pointer-events-none select-none animate-in zoom-in duration-300">
                        <div className="text-[10px] text-cyber-blue font-mono tracking-tighter">ACCESSING_NODE...</div>
                        <div className="text-[8px] text-white/40 font-mono">STATUS: ENCRYPTED</div>
                    </div>
                </Html>
            )}
        </group>
    )
}

export const OrbitalMenu = () => {
    const isOrbitPaused = useSystemStore((state) => state.isOrbitPaused)
    const rotationTimeRef = useRef(0)
    const [rotationTime, setRotationTime] = useState(0)

    const nodes = [
        { label: 'Wisdom', color: '#ffd700', radius: 4 },
        { label: 'Systems', color: '#00f2ff', radius: 4.5 },
        { label: 'Security', color: '#00f2ff', radius: 5 },
        { label: 'About', color: '#ffd700', radius: 5.5 },
    ]

    useFrame((_, delta) => {
        if (!isOrbitPaused) {
            rotationTimeRef.current += delta * 0.2
            setRotationTime(rotationTimeRef.current)
        }
    })

    return (
        <group>
            {nodes.map((node, i) => (
                <NavNode
                    key={node.label}
                    label={node.label}
                    color={node.color}
                    radius={node.radius}
                    angle={(i / nodes.length) * Math.PI * 2}
                    rotationTime={rotationTime}
                />
            ))}

            {/* Orbital Path Visuals */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.95, 4.05, 64]} />
                <meshBasicMaterial color="#00f2ff" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}
