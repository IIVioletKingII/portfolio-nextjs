'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { MusicNoteFollower } from './musicFollower'
import CeligoApp from './components/Celigo/CeligoApp'
import Hero from './components/Hero'

export default function Home() {

	const followerRef = useRef<MusicNoteFollower | null>(null);

	useEffect(() => {

		let follower: MusicNoteFollower | null = null

		// Wait for user interaction to unlock audio
		const startAudio = async () => {
			await Tone.start();
			follower = new MusicNoteFollower();
			follower.loadMidiFile('/songs/drowning_love.mid');
			follower?.play();
			// followerRef.current = follower;
			console.log('🎵 MusicNoteFollower started');
			document.removeEventListener('click', startAudio);
		}

		// document.addEventListener('click', startAudio);

		return () => {
			document.removeEventListener('click', startAudio);
			follower?.destroy();
			followerRef.current = null;
		}
	}, []);

	function handleToggleMusic(isMuted: boolean) {
		if (followerRef.current) {
			if (isMuted)
				followerRef.current.pause();
			else
				followerRef.current.play();
		}
	}


	function handleSetVolume(volume: number) {

	}

	return (
		<div>

			<Hero></Hero>
			<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

					<div className='font-bold text-2xl'>
						Celigo Flow Editor
					</div>
					{/* card */}
					<div className="bg-white dark:bg-card-dark rounded-2xl ring shadow-xl ring-gray-900/5 w-200 h-75" >
						<div className="relative overflow-hidden rounded-2xl bg-card">
							<div className="relative w-200 h-75">
								<CeligoApp />
							</div>
							<div className="absolute inset-0 pointer-events-none bg-fade-mask h-75" />
						</div>
					</div>
					{/* <VolumeSlider setExternalMuted={handleToggleMusic} setExternalVolume={handleSetVolume} /> */}
				</main>
			</div>
		</div>
	);
}
