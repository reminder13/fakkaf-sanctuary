import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Source } from './Source'
import { Nebula } from './Nebula'
import { HUD } from '../ui/HUD'
import { OrbitalMenu } from '../ui/OrbitalMenu'
import { AudioEngine } from '../audio/AudioEngine'
import { SecurityMatrix } from '../ui/SecurityMatrix'
import { IdentityVault } from '../ui/IdentityVault'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'

export const Scene = () => {
    return (
        <div className="fixed inset-0 w-full h-full bg-space-deep overflow-hidden">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                <Environment preset="night" />

                <Suspense fallback={null}>
                    <Nebula />
                </Suspense>

                <Suspense fallback={null}>
                    <Source />
                </Suspense>

                <Suspense fallback={null}>
                    <OrbitalMenu />
                </Suspense>

                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
                    <Noise opacity={0.03} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={5} color="#ffd700" />
                <pointLight position={[-10, -10, -10]} intensity={3} color="#00f2ff" />
            </Canvas>

            {/* Heads-Up Display Layer */}
            <HUD />
            <AudioEngine />
            <SecurityMatrix />
            <IdentityVault />

            {/* Aesthetic Overlays */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03)_0%,transparent_70%)]" />
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
        </div>
    )
}
