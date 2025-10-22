'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';
import VolumeSlider from './VolumeSlider'
import ThemeToggle from './ThemeToggle'


export default function Hero() {

	return (
		<section className='h-[90vh] hero-bg-dots p-16 flex justify-content-center align-items-center gap-16'>
			<div className="h-75 w-50 bg-violet-800 overflow-hidden rounded-2xl bg-card p-8">
				picture
			</div>
			<div className="flex flex-col gap-8">
				<span>Sam DePoule</span>
				<span>Full-Stack Dev, Cloud Integration Dev</span>
				<span>Idk something here</span>
			</div>
		</section>
	)
}
