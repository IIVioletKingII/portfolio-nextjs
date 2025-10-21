// VolumeController.ts

/**
 * Manages the volume and mute state (0.0 to 1.0) and uses provided external functions
 * for actual volume/mute setting, and callbacks for UI updates.
 */
export class VolumeController {
	// Internal state
	private currentVolume: number;
	private isMuted: boolean;
	private lastVolume: number; // Stores volume before muting

	// External functions provided via the React component's props
	private setVolumeFn: (volume: number) => void;
	private setMutedFn: (isMuted: boolean) => void;

	// Callbacks for React state (UI updates)
	private volumeChangeCallback: ((volume: number) => void) | null = null;
	private muteChangeCallback: ((isMuted: boolean) => void) | null = null;

	/**
	 * @param initialVolume The starting volume (0.0 to 1.0).
	 * @param setVolumeFn The function to call to externally set the volume.
	 * @param setMutedFn The function to call to externally set the mute state.
	 */
	constructor(
		initialVolume: number,
		setVolumeFn: (volume: number) => void,
		setMutedFn: (isMuted: boolean) => void
	) {
		this.currentVolume = initialVolume;
		this.lastVolume = initialVolume > 0 ? initialVolume : 0.5;
		this.isMuted = false;
		this.setVolumeFn = setVolumeFn;
		this.setMutedFn = setMutedFn;
	}

	// --- UI Listener/Getter Methods ---

	public onVolumeChange(callback: (volume: number) => void) {
		this.volumeChangeCallback = callback;
		// Immediately call back with current state to sync UI
		callback(this.currentVolume);
	}

	public onMuteChange(callback: (isMuted: boolean) => void) {
		this.muteChangeCallback = callback;
		// Immediately call back with current state to sync UI
		callback(this.isMuted);
	}

	// --- Action Methods ---

	/**
	 * Sets the volume level, triggering the external setVolumeFn.
	 * @param newVolume A number between 0.0 and 1.0.
	 */
	public setVolume(newVolume: number) {
		const clampedVolume = Math.min(1, Math.max(0, newVolume));

		this.currentVolume = clampedVolume;

		// 1. External Action
		this.setVolumeFn(clampedVolume);

		// 2. Mute/Unmute Logic
		if (clampedVolume > 0 && this.isMuted) {
			this.isMuted = false;
			this.setMutedFn(false);
			this.muteChangeCallback?.(false);
		}

		if (clampedVolume > 0) {
			this.lastVolume = clampedVolume;
		}

		// 3. UI Update
		this.volumeChangeCallback?.(clampedVolume);
	}

	/**
	 * Toggles the mute state, triggering the external setMutedFn.
	 */
	public toggleMute() {
		const newMutedState = !this.isMuted;
		this.isMuted = newMutedState;

		// 1. External Action
		this.setMutedFn(newMutedState);

		// 2. Volume Logic
		if (newMutedState) {
			// Mute: Visually set slider to 0
			this.volumeChangeCallback?.(0);

		} else {
			// Unmute: Restore volume
			const restoredVolume = this.lastVolume > 0.01 ? this.lastVolume : 0.5;

			this.currentVolume = restoredVolume;
			this.setVolumeFn(restoredVolume);
			this.volumeChangeCallback?.(restoredVolume);
		}

		// 3. UI Update for Mute button
		this.muteChangeCallback?.(newMutedState);
	}
}