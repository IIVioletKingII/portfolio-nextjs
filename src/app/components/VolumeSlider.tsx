// VolumeSlider.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { VolumeController } from './VolumeController'; // Import the simplified class

// Define the component's props interface
interface VolumeSliderProps {
	setExternalVolume: (volume: number) => void;
	setExternalMuted: (isMuted: boolean) => void;
	initialVolume?: number; // Optional starting volume, defaults to 0.5
}

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
	};

	const displayVolume = isMuted ? 0 : volume;

	const icon = isMuted || displayVolume === 0
		? '🔇' // Mute icon
		: volume < 0.5
			? '🔈' // Low volume icon
			: '🔊'; // High volume icon


	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px', border: '1px solid #0070f3', borderRadius: '8px' }}>
			{/* Mute/Unmute Button (Toggle) */}
			<button onClick={() => controller.toggleMute()} style={{ fontSize: '24px', cursor: 'pointer', border: 'none', background: 'none' }}>
				{icon}
			</button>

			{/* Volume Slider */}
			<input
				title='volume slider'
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={displayVolume}
				onChange={handleSliderChange}
				style={{ width: '150px' }}
			/>
			<span>{Math.round(displayVolume * 100)}%</span>
		</div>
	);
};

export default VolumeSlider;