import { createContext, useContext, useState } from 'react'

type RoleType = 'client' | 'analyst'

type RoleContextType = {
    isClient: boolean
    isAnalyst: boolean
    role: RoleType
    setRole: (r: RoleType) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<RoleType>('client')

    const isClient = role === 'client'
    const isAnalyst = role === 'analyst'

    return (
        <RoleContext.Provider value={{ isClient, isAnalyst, role, setRole }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => {
    const ctx = useContext(RoleContext)
    if (!ctx) throw new Error('useRole must be used inside RoleProvider')
    return ctx
}