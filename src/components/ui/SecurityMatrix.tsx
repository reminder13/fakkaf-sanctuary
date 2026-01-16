import { useState, useEffect } from 'react'
import { X, ShieldAlert, Cpu, Database, Activity } from 'lucide-react'
import { useSystemStore } from '../../store/useSystemStore'
import { motion, AnimatePresence } from 'framer-motion'

export const SecurityMatrix = () => {
    const { isMatrixActive, setMatrixActive, latency, updateMetrics } = useSystemStore()
    const [logs, setLogs] = useState<string[]>([])

    useEffect(() => {
        if (isMatrixActive) {
            const interval = setInterval(() => {
                updateMetrics()
                const newLog = `[${new Date().toLocaleTimeString()}] TRACE: ${Math.random().toString(36).substring(7).toUpperCase()} -> BYPASS_PREVENTED`
                setLogs(prev => [newLog, ...prev].slice(0, 10))
            }, 1500)
            return () => clearInterval(interval)
        }
    }, [isMatrixActive, updateMetrics])

    if (!isMatrixActive) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, scale: 1, backdropFilter: 'blur(20px)' }}
                exit={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 bg-space-deep/40 overflow-y-auto"
            >
                <div className="relative w-full max-w-5xl min-h-[50vh] max-h-[90vh] border border-cyber-blue/30 bg-black/80 shadow-[0_0_50px_rgba(0,242,255,0.1)] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-3 sm:p-4 border-b border-cyber-blue/20 bg-cyber-blue/5">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="text-cyber-blue w-4 h-4 sm:w-5 h-5 animate-pulse" />
                            <span className="font-mono text-[10px] sm:text-sm tracking-widest font-bold text-cyber-blue uppercase">Security Matrix // v1.9</span>
                        </div>
                        <button onClick={() => setMatrixActive(false)} className="hover:rotate-90 transition-transform duration-300">
                            <X className="text-white/60 hover:text-white w-5 h-5" />
                        </button>
                    </div>

                    {/* Grid Content */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1 overflow-y-auto">
                        {/* Column 1: Metrics */}
                        <div className="border-b md:border-b-0 md:border-r border-white/5 p-4 sm:p-6 flex flex-col gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center font-mono text-[10px]">
                                    <span className="text-white/40 uppercase">Latency (MS)</span>
                                    <span className="text-cyber-blue">{latency}ms</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${(latency / 30) * 100}%` }}
                                        className="h-full bg-cyber-blue"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 border border-white/10 bg-white/5 flex items-center gap-4">
                                    <Cpu className="text-gold w-5 h-5" />
                                    <div className="font-mono">
                                        <div className="text-[8px] text-white/40">CPU_LOAD</div>
                                        <div className="text-xs text-white">42.8%</div>
                                    </div>
                                </div>
                                <div className="p-4 border border-white/10 bg-white/5 flex items-center gap-4">
                                    <Database className="text-cyber-blue w-5 h-5" />
                                    <div className="font-mono">
                                        <div className="text-[8px] text-white/40">MEMORY_USAGE</div>
                                        <div className="text-xs text-white">1.9 GB / 64 GB</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Live Logs */}
                        <div className="col-span-2 p-6 bg-black/40 font-mono text-[10px] overflow-hidden flex flex-col">
                            <div className="text-cyber-blue/40 mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> LIVE_ENCRYPTED_TRAFFIC_LOGS
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                                {logs.map((log, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className="text-white/60"
                                    >
                                        <span className="text-cyber-blue mr-2">&gt;</span>
                                        {log}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-white/20">
                                SYSTEM_HASH: 5fb4-83b5-dfac-4fb9-8da8-9158
                            </div>
                        </div>
                    </div>

                    {/* Footer Decoration */}
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-cyber-blue" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gold" />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
