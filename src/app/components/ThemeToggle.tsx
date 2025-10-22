'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
	const { theme, systemTheme, setTheme } = useTheme()

	// Figure out which theme is currently active (respects system preference)
	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<button
			onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
			aria-label='Toggle theme'
			className='p-2 rounded-full hover:opacity-50 hover:cursor-pointer transition-colors'
		>
			{currentTheme === 'light' ? (
				<Moon className='w-5 h-5 text-gray-800' />
			) : (
				<Sun className='w-5 h-5 text-yellow-400' />
			)}
		</button>
	)
}
