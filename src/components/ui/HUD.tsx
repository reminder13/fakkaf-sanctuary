import { useState, useEffect } from 'react'
import { Activity, ShieldCheck, Terminal, ShieldAlert } from 'lucide-react'
import { useSystemStore } from '../../store/useSystemStore'

export const HUD = () => {
    const { latency, throughput, updateMetrics } = useSystemStore()
    const [rateLimit, setRateLimit] = useState(false)
    const [blockedRequests, setBlockedRequests] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            updateMetrics()
            // Simulate rate limiter activity
            if (Math.random() > 0.95) {
                setRateLimit(true)
                setBlockedRequests(prev => prev + 1)
                setTimeout(() => setRateLimit(false), 2000)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [updateMetrics])

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-50">
            {/* Top Section */}
            <div className="flex justify-between items-start animate-in fade-in slide-in-from-top duration-1000">
                <div className="flex gap-4">
                    <div className="p-2 border border-cyber-blue/20 bg-space-deep/40 backdrop-blur-md">
                        <ShieldCheck className="w-5 h-5 text-cyber-blue animate-pulse" />
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase flex flex-col">
                        <span className="text-cyber-blue font-bold">System Status: Secure</span>
                        <span className="text-white/60">AuthID: A. BURAK AKA</span>
                        <span className="text-white/40">Protocol: MUDDESSIR_19</span>
                    </div>
                </div>

                <div className="flex flex-col items-end font-mono text-[10px] tracking-widest">
                    <div className="flex items-center gap-2 text-gold">
                        <Activity className="w-3 h-3" />
                        <span>LATENCY: {latency}MS</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyber-blue mt-1">
                        <span className="opacity-40 uppercase">THROUGHPUT:</span>
                        <span>{throughput} KB/S</span>
                    </div>
                    <div className="text-white/60 mt-2">[ 19.6.2002 ]</div>
                </div>
            </div>

            {/* Center Layer: Rate Limiter Warning */}
            {rateLimit && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="hud-panel p-6 border-red-500/50 bg-red-500/10 flex flex-col items-center gap-2 animate-pulse">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                        <div className="text-red-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">RATE LIMIT TRIGGERED</div>
                        <div className="text-white/40 font-mono text-[8px] uppercase">Brute-Force Protection Active // Blocked: {blockedRequests}</div>
                    </div>
                </div>
            )}

            {/* Bottom Section */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="flex items-center gap-3 px-4 py-1 border-x border-cyber-blue/30 text-cyber-blue/40 font-mono text-[10px] uppercase tracking-[0.6em]">
                    <Terminal className="w-3 h-3" />
                    Fakkaf Sanctuary // Universal OS v.01
                </div>
            </div>
        </div>
    )
}
