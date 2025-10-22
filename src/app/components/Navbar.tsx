'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';
import VolumeSlider from './VolumeSlider'
import ThemeToggle from './ThemeToggle'

const routes = [
	{ name: 'Home', path: '/' },
	{ name: 'About', path: '/about' },
	{ name: 'Contact', path: '/contact' },
];

export default function Navbar() {
	const pathname = usePathname()

	return (
		<header className='fixed w-full backdrop-blur-sm shadow-sm z-50'>

			<nav className='flex items-center justify-between p-4 max-w-4xl m-auto'>
				<Link href="/" className='text-xl font-semibold'>SD</Link>

				<ul className='flex space-x-6'>
					<li>
						<Link
							href='/'
							className={pathname === '/' ? 'text-violet-400' : 'hover:text-violet-300'}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href='/about'
							className={pathname === '/about' ? 'text-blue-400' : 'hover:text-violet-300'}
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href='/contact'
							className={pathname === '/contact' ? 'text-blue-400' : 'hover:text-violet-300'}
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
