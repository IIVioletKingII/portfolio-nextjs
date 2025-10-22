// musicFollower.ts

import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';

let defaultFollower: MusicNoteFollower | null = null

type NoteEvent = {
	time: number;
	note: string;
	duration: number;
};

export class MusicNoteFollower {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private anim = {
		fadeInLead: 0.12,
		bounceStrength: 9,
		fadeOutTime: 0.2,
		spawnOffset: 60, // px above cursor start position
	};
	private allNotes: {
		time: number;
		note: string;
		duration: number;
		x: number;
		y: number;
		targetY: number;
		startTime: number;
		landTime: number;
		life: number;
		vy: number;
		fadeTimer?: number;
		phase: 'waiting' | 'fadeIn' | 'land' | 'fadeOut';
	}[] = [];
	private synth: Tone.PolySynth;
	private isActive = false;
	private stopTimeout: ReturnType<typeof setTimeout> | null = null;
	private loopPart?: Tone.Part;
	private lastFrame = performance.now();
	private lastRealTime = 0;

	private lastMouseX = window.innerWidth / 2;
	private lastMouseY = window.innerHeight / 2;
	private index = 0;

	constructor() {

		// --- Canvas setup ---
		this.canvas = document.createElement('canvas')
		this.canvas.style.position = 'fixed'
		this.canvas.style.top = '0'
		this.canvas.style.left = '0'
		this.canvas.style.pointerEvents = 'none'
		this.canvas.style.zIndex = '-1'
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		document.body.appendChild(this.canvas)

		const ctx = this.canvas.getContext('2d')
		if (!ctx) throw new Error('Canvas context not available')
		this.ctx = ctx

		// --- Audio setup ---
		this.synth = new Tone.PolySynth(Tone.Synth, {
			oscillator: { type: 'triangle' },
			envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 1.5 }
		});

		const reverb = new Tone.Reverb({ decay: 5, wet: 0.4 })
		const delay = new Tone.FeedbackDelay('8n', 0.2)
		this.synth.chain(reverb, delay, Tone.getDestination())

		// --- Event binding ---
		window.addEventListener('mousemove', this.handleMouseMove);
		requestAnimationFrame(this.draw);
	}

	private handleMouseMove = (e: MouseEvent) => {
		if (!this.isActive) return // paused

		this.lastMouseX = e.clientX;
		this.lastMouseY = e.clientY;

		if (Tone.getContext().state !== 'running') Tone.start();
		if (this.stopTimeout) clearTimeout(this.stopTimeout)
		this.stopTimeout = setTimeout(() => Tone.getTransport().pause(), 150);

		const transport = Tone.getTransport();
		if (!transport.state || transport.state !== 'started') {
			transport.start()
		}
	}

	private draw = () => {
		const now = performance.now() / 1000;
		const tNow = Tone.getTransport().seconds;

		if (this.isActive && this.loopPart) {

			if (!this.lastRealTime) this.lastRealTime = now;
			const dt = now - this.lastRealTime;
			const length = Tone.Time(this.loopPart.loopEnd).toSeconds();

			const ctx = this.ctx;
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.allNotes.forEach((n, i) => {

				const beforeStart = tNow < n.startTime;
				const isFadingOut = n.phase === 'fadeOut';
				if (beforeStart && !isFadingOut) return;

				// ensure fadeOut continues even if transport pauses
				if (n.phase === 'fadeIn' && n.life >= 1) {
					n.phase = 'land';
					n.vy = -this.anim.bounceStrength;
				}
				if ((n.phase === 'land' || n.phase === 'fadeIn') && !n.fadeTimer)
					n.fadeTimer = now;

				if (n.fadeTimer && n.phase !== 'fadeOut' && now - n.fadeTimer > this.anim.fadeOutTime)
					n.phase = 'fadeOut';

				if (tNow < n.landTime) {
					if (this.lastFrame < n.startTime) {
						n.x = this.lastMouseX;
						n.y = this.lastMouseY - this.anim.spawnOffset;
						n.targetY = this.lastMouseY;
					}

					n.phase = 'fadeIn';
					const progress = (tNow - n.startTime) / (n.landTime - n.startTime);
					const eased = 1 - Math.pow(1 - progress, 2); // ease-in quadratic
					n.life = eased;
					n.y = n.targetY - (1 - eased) * this.anim.spawnOffset;
				} else if (n.phase === 'fadeIn') {
					n.phase = 'land';
					n.vy = -this.anim.bounceStrength;
				}

				if (n.phase === 'land') {
					n.y += n.vy * dt * 60;
					n.vy += 0.8 * dt * 60;
					if (n.y > n.targetY) {
						n.y = n.targetY;
						n.vy *= -0.4;
					}
				}

				if (n.phase === 'fadeOut') {
					n.life -= dt / this.anim.fadeOutTime;
					if (n.life <= 0) {
						n.phase = 'waiting';
						n.landTime += length;
						n.startTime += length;
						n.vy = 0;
						n.fadeTimer = undefined;
						n.life = 0;
						// if (i == 0) this.index++;
						return;
					}
				}

				this.ctx.globalAlpha = n.life;
				ctx.font = '24px Arial';
				ctx.fillText('🎵', n.x, n.y);
			});
		}

		this.lastFrame = tNow;
		this.lastRealTime = now;
		requestAnimationFrame(this.draw);
	};

	public play() {
		this.isActive = true;
		Tone.getDestination().volume.rampTo(0, 0.3);
	}

	public pause() {
		this.isActive = false;
		Tone.getDestination().volume.rampTo(-Infinity, 1);
	}

	public destroy() {
		window.removeEventListener('mousemove', this.handleMouseMove);
		this.canvas.remove();
		this.synth.dispose();
	}

	public loadSongFromJson(notes: NoteEvent[]) {
		const { fadeInLead, spawnOffset } = this.anim;

		const tNow = Tone.getTransport().seconds;

		this.allNotes = notes.map(n => ({
			...n,
			startTime: Math.max(0, tNow + n.time - fadeInLead),
			landTime: n.time,
			x: 0,
			y: 0,
			life: 0,
			vy: 0,
			phase: 'waiting',
			targetY: 0,
		}));

		if (this.loopPart) this.loopPart.dispose();
		this.loopPart = new Tone.Part((time, note) => {
			if (!this.isActive) return;
			this.synth.triggerAttackRelease(note.note, note.duration, time);
		}, notes).start(0);
	}

	private round(num: number, places: number) {
		const factor = Math.pow(10, places);
		return Math.round(num * factor) / factor;
	}

	public async loadMidiFile(url: string) {
		const res = await fetch(url);
		const data = await res.arrayBuffer();
		const midi = new Midi(data);
		const tempoEvent = midi.header.tempos[0];

		if (tempoEvent) {
			Tone.getTransport().bpm.value = tempoEvent.bpm;
			console.log(`Set BPM to ${tempoEvent.bpm}`);
		}

		const sigEvent = midi.header.timeSignatures[0];
		const [num, denom] = sigEvent.timeSignature;
		if (sigEvent) {
			Tone.getTransport().timeSignature = [num, denom];
		}

		const events: NoteEvent[] = midi.tracks.flatMap(track => {
			return track.notes.map(n => ({
				time: n.time,
				note: n.name,
				duration: n.duration
			}));
		}).sort((a, b) => a.time - b.time);

		this.loadSongFromJson(events);

		const measures = Math.round(
			midi.duration /
			(60 / Tone.Transport.bpm.value) /
			(num * (4 / denom))
		);

		this.loopPart!.loop = true;
		this.loopPart!.loopEnd = `${measures}m`;
		console.log(`Loop end set to ${Math.round(measures)} measures`);
	}
}

export function getFollower(): MusicNoteFollower {
	if (!defaultFollower)
		defaultFollower = new MusicNoteFollower();

	return defaultFollower;
}