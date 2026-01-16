import { X, User, Shield, Binary, Mail } from 'lucide-react'
import { useSystemStore } from '../../store/useSystemStore'
import { motion, AnimatePresence } from 'framer-motion'

export const IdentityVault = () => {
    const { isVaultActive, setVaultActive } = useSystemStore()

    if (!isVaultActive) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-3xl"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 20, rotateX: 20 }}
                    animate={{ scale: 1, y: 0, rotateX: 0 }}
                    className="relative w-full max-w-2xl border-x border-gold/40 bg-space-deep/90 p-6 sm:p-12 shadow-[0_0_100px_rgba(255,215,0,0.1)] overflow-y-auto max-h-[90vh]"
                >
                    {/* Cyber Decor */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

                    <button onClick={() => setVaultActive(false)} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/40 hover:text-white transition-colors">
                        <X className="w-5 h-5 sm:w-6 h-6" />
                    </button>

                    <header className="text-center mb-8 sm:mb-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-block px-4 py-1 border border-gold/40 bg-gold/5 text-gold font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-4 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                        >
                            Divine Identity Protocol: Synchronized
                        </motion.div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-white uppercase italic">
                            Burak <span className="text-gold">AKA</span>
                        </h2>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 font-mono">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/5 hover:border-gold/30 transition-colors">
                                <User className="w-5 h-5 text-gold shrink-0" />
                                <div>
                                    <div className="text-[10px] text-white/40">LEVEL_RANK</div>
                                    <div className="text-xs text-white">SENIOR SYSTEM ARCHITECT</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/5 hover:border-cyber-blue/30 transition-colors">
                                <Shield className="w-5 h-5 text-cyber-blue shrink-0" />
                                <div>
                                    <div className="text-[10px] text-white/40">SPECIALIZATION</div>
                                    <div className="text-xs text-white">CYBERSECURITY SPECIALIST</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <a
                                href="mailto:basvuru@fakkaf.com"
                                className="flex items-start gap-4 p-4 border border-white/5 bg-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all group pointer-events-auto"
                            >
                                <Mail className="w-5 h-5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                                <div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-tighter">Secure_Channel</div>
                                    <div className="text-xs text-white">basvuru@fakkaf.com</div>
                                </div>
                            </a>
                            <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/5">
                                <Binary className="w-5 h-5 text-cyber-blue shrink-0" />
                                <div>
                                    <div className="text-[10px] text-white/40">CORE_PROTOCOL</div>
                                    <div className="text-xs text-white">MUDDESSIR // 19</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-[10px] text-white/20 font-mono tracking-widest uppercase">
                        "Secure by Design - Bound by Spirit"
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
