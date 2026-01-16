import { create } from 'zustand'

interface SystemState {
    activeNode: string | null
    isAudioActive: boolean
    isMatrixActive: boolean
    isVaultActive: boolean
    latency: number
    throughput: number

    setActiveNode: (node: string | null) => void
    toggleAudio: () => void
    setMatrixActive: (active: boolean) => void
    setVaultActive: (active: boolean) => void
    updateMetrics: () => void
}

export const useSystemStore = create<SystemState>((set) => ({
    activeNode: null,
    isAudioActive: false,
    isMatrixActive: false,
    isVaultActive: false,
    latency: 19,
    throughput: 0,

    setActiveNode: (node) => set({ activeNode: node }),
    toggleAudio: () => set((state) => ({ isAudioActive: !state.isAudioActive })),
    setMatrixActive: (active) => set({ isMatrixActive: active }),
    setVaultActive: (active) => set({ isVaultActive: active }),
    updateMetrics: () => set({
        latency: Math.floor(Math.random() * 19) + 5,
        throughput: Math.floor(Math.random() * 1000)
    })
}))
