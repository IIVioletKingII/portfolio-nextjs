'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';
import VolumeSlider from './VolumeSlider'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
	const pathname = usePathname()

	return (
		<header className='fixed w-full backdrop-blur-sm'>

			<nav className='flex items-center justify-between p-4 text-white'>
				<Link href="/" className='text-xl font-semibold'>SD</Link>

				<ul className='flex space-x-6'>
					<li>
						<Link
							href='/'
							className={pathname === '/' ? 'text-blue-400' : 'hover:text-blue-300'}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href='/about'
							className={pathname === '/about' ? 'text-blue-400' : 'hover:text-blue-300'}
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href='/contact'
							className={pathname === '/contact' ? 'text-blue-400' : 'hover:text-blue-300'}
						>
							Contact
						</Link>
					</li>
				</ul>

				<div className='flex'>

					{/* <VolumeSlider /> */}

					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}
