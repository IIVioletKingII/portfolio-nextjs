// VolumeSlider.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import { VolumeController } from './VolumeController'; // Import the simplified class
import { init } from 'next/dist/compiled/webpack/webpack';

// Define the component's props interface
interface VolumeSliderProps {
	setExternalVolume: (volume: number) => void;
	setExternalMuted: (isMuted: boolean) => void;
	initialVolume?: number; // Optional starting volume, defaults to 0.5
}

const volumeButtonStyles = 'w-5 h-5';

const VolumeSlider: React.FC<VolumeSliderProps> = ({
	setExternalVolume,
	setExternalMuted,
	initialVolume = 0.5,
}) => {
	// Use useMemo to create a single instance of the controller 
	// with the provided props.
	const controller = useMemo(() =>
		new VolumeController(initialVolume, setExternalVolume, setExternalMuted),
		[initialVolume, setExternalVolume, setExternalMuted]
	);

	useEffect(() => {
		if (initialVolume === 0)
			controller.toggleMute();
	}, [])

	// State to drive the UI (synced by the controller's callbacks)
	// Initial state is set via the controller's immediate callback in useEffect
	const [volume, setVolume] = useState(initialVolume);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		// Set up UI state callbacks for the controller
		// The controller's onVolumeChange and onMuteChange will immediately
		// call setVolume and setIsMuted to synchronize the UI state.
		controller.onVolumeChange(setVolume);
		controller.onMuteChange(setIsMuted);

		return () => {
			// Cleanup: clear the callbacks when the component unmounts
			controller.onVolumeChange(() => { });
			controller.onMuteChange(() => { });
		};
		// Re-run this effect only if the controller instance changes (which it won't due to useMemo)
	}, [controller]);

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(event.target.value);
		controller.setVolume(newVolume);
		if (newVolume === 0)
			controller.toggleMute();
	};

	const displayVolume = isMuted ? 0 : volume;

	const getVolumeIcon = () => {
		if (isMuted || displayVolume === 0) return <VolumeX className={volumeButtonStyles} />;
		if (volume < 0.2) return <Volume className={volumeButtonStyles} />;
		if (volume < 0.66) return <Volume1 className={volumeButtonStyles} />;
		return <Volume2 className={volumeButtonStyles} />;
	};

	return (
		<div className='flex align-center gap-2'>
			{/* Mute/Unmute Button (Toggle) */}
			<button onClick={() => controller.toggleMute()} className='p-2 rounded-full hover:opacity-60 cursor-pointer' >
				{getVolumeIcon()}
			</button>

			{/* Volume Slider */}
			<input
				className='hidden'
				title='volume slider'
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={displayVolume}
				onChange={handleSliderChange}
				style={{ width: '100px' }}
			/>
			{/* <span>{Math.round(displayVolume * 100)}%</span> */}
		</div>
	);
};

export default VolumeSlider;