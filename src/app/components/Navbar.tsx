'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';
import VolumeSlider from './VolumeSlider'
import ThemeToggle from './ThemeToggle'
import { getFollower, MusicNoteFollower } from './musicFollower'
import { useEffect } from 'react';

const routes = [
	{ name: 'Home', path: '/' },
	{ name: 'About', path: '/about' },
	{ name: 'Contact', path: '/contact' },
];

export default function Navbar() {
	const pathname = usePathname();

	useEffect(() => {
		getFollower().loadMidiFile('/songs/drowning_love.mid');
	}, [])

	function handleToggleMusic(isMuted: boolean) {
		const follower: MusicNoteFollower = getFollower();
		if (isMuted)
			follower.pause();
		else
			follower.play();
	}


	function handleSetVolume(volume: number) {
		const follower = getFollower();
		// follower.setVolume(volume);
	}

	return (
		<header className='fixed w-full backdrop-blur-sm shadow-sm z-50'>

			<nav className='flex items-center justify-between p-4 max-w-4xl m-auto'>
				<Link href="/" className='text-3xl font-semibold'>SD</Link>

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
							className={pathname === '/about' ? 'text-violet-400' : 'hover:text-violet-300'}
						>
							About
						</Link>
					</li>
				</ul>

				<div className='flex gap-2'>

					<VolumeSlider setExternalMuted={handleToggleMusic} setExternalVolume={handleSetVolume} initialVolume={0} />

					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}
