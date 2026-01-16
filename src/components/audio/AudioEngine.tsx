import { useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useSystemStore } from '../../store/useSystemStore'

export const AudioEngine = () => {
    const { isAudioActive, toggleAudio } = useSystemStore()
    const audioCtx = useRef<AudioContext | null>(null)
    const osc1 = useRef<OscillatorNode | null>(null)
    const osc2 = useRef<OscillatorNode | null>(null)
    const gainNode = useRef<GainNode | null>(null)

    useEffect(() => {
        if (isAudioActive && !audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            gainNode.current = audioCtx.current.createGain()
            gainNode.current.gain.setValueAtTime(0, audioCtx.current.currentTime)
            gainNode.current.connect(audioCtx.current.destination)

            osc1.current = audioCtx.current.createOscillator()
            osc1.current.frequency.setValueAtTime(432, audioCtx.current.currentTime)
            const panner1 = audioCtx.current.createStereoPanner()
            panner1.pan.setValueAtTime(-1, audioCtx.current.currentTime)
            osc1.current.connect(panner1).connect(gainNode.current)

            osc2.current = audioCtx.current.createOscillator()
            osc2.current.frequency.setValueAtTime(440, audioCtx.current.currentTime)
            const panner2 = audioCtx.current.createStereoPanner()
            panner2.pan.setValueAtTime(1, audioCtx.current.currentTime)
            osc2.current.connect(panner2).connect(gainNode.current)

            osc1.current.start()
            osc2.current.start()
        }

        if (audioCtx.current) {
            if (isAudioActive) {
                gainNode.current?.gain.exponentialRampToValueAtTime(0.05, audioCtx.current.currentTime + 2)
            } else {
                gainNode.current?.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 2)
            }
        }
    }, [isAudioActive])

    return (
        <div className="fixed bottom-10 left-10 z-[100] pointer-events-auto">
            <button
                onClick={toggleAudio}
                className={`flex items-center gap-3 p-3 bg-space-deep/60 border backdrop-blur-xl group transition-all duration-500 ${isAudioActive ? 'border-gold/50 shadow-[0_0_20px_rgba(255,215,0,0.2)]' : 'border-cyber-blue/20'
                    }`}
            >
                {isAudioActive ? (
                    <Volume2 className="w-4 h-4 text-gold animate-pulse" />
                ) : (
                    <VolumeX className="w-4 h-4 text-cyber-blue/40" />
                )}
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
                    {isAudioActive ? 'Sanctuary Mode: Active' : 'Initiate 432Hz Link'}
                </span>
            </button>
        </div>
    )
}
