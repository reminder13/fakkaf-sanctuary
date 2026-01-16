import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { Source } from './Source'
import { Nebula } from './Nebula'
import { HUD } from '../ui/HUD'
import { OrbitalMenu } from '../ui/OrbitalMenu'
import { AudioEngine } from '../audio/AudioEngine'
import { SecurityMatrix } from '../ui/SecurityMatrix'
import { IdentityVault } from '../ui/IdentityVault'

export const Scene = () => {
    return (
        <div className="fixed inset-0 w-full h-full bg-space-deep overflow-hidden">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

                <Suspense fallback={null}>
                    <Nebula />
                    <Source />
                    <OrbitalMenu />
                    <Environment preset="night" />

                    <ambientLight intensity={0.1} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#ffd700" />
                    <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00f2ff" />
                </Suspense>
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
