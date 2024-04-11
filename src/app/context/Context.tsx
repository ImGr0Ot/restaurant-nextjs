"use client"
import { Dispatch, SetStateAction, createContext, useState } from "react"

export type ContextUser = {
	email: String
}

export interface ContextInterface {
	user: ContextUser
	setUser: Dispatch<SetStateAction<ContextUser>>
	isAuthenticated: Boolean
	setIsAuthenticated: Dispatch<SetStateAction<Boolean>>
}

type Props = {
	children: React.ReactNode
}

const defaultState: ContextInterface = {
	user: { email: "" },
	setUser: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
}

export const Context = createContext(defaultState)

export function ContextProvider({ children }: Props) {
	const [user, setUser] = useState<ContextUser>(defaultState.user)
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(
		defaultState.isAuthenticated
	)

	return (
		<Context.Provider
			value={{
				user,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
			}}>
			{children}
		</Context.Provider>
	)
}
