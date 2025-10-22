'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Loader } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
	const { theme, systemTheme, setTheme } = useTheme()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Figure out which theme is currently active (respects system preference)
	const currentTheme = theme === 'system' ? systemTheme : theme

	// if (!mounted)
	// 	return <button className="p-2 rounded" aria-label="Toggle theme"></button>;

	return (
		<button
			onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
			aria-label='Toggle theme'
			className='p-2 rounded-full hover:opacity-70 hover:cursor-pointer transition-colors'
		>
			{mounted ?
				(currentTheme === 'light' ? (
					<Moon className='w-5 h-5 text-gray-800' />
				) : (
					<Sun className='w-5 h-5' />
				))
				:
				<Loader className='w-5 h-5' />
			}
		</button>
	)
}
