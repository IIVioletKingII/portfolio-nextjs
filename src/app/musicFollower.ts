// musicFollower.ts
import * as Tone from 'tone'

export class MusicNoteFollower {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	private notes: { x: number; y: number; life: number }[] = []
	private synth: Tone.PolySynth
	private isActive = false
	private stopTimeout: ReturnType<typeof setTimeout> | null = null

	constructor() {
		// --- Canvas setup ---
		this.canvas = document.createElement('canvas')
		this.canvas.style.position = 'fixed'
		this.canvas.style.top = '0'
		this.canvas.style.left = '0'
		this.canvas.style.pointerEvents = 'none'
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
		})

		const reverb = new Tone.Reverb({ decay: 3, wet: 0.4 })
		const delay = new Tone.FeedbackDelay('8n', 0.2)
		this.synth.chain(reverb, delay, Tone.Destination)

		// --- Event binding ---
		window.addEventListener('mousemove', this.handleMouseMove)
		requestAnimationFrame(this.draw)
	}

	private handleMouseMove = (e: MouseEvent) => {
		if (!this.isActive) return // respect pause()

		if (Tone.context.state !== 'running') Tone.start()
		if (this.stopTimeout) clearTimeout(this.stopTimeout)
		this.stopTimeout = setTimeout(() => this.pause(), 500)

		const pitch = 60 + Math.floor((e.clientY / window.innerHeight) * 24)
		const velocity = 0.5 + Math.random() * 0.4
		this.synth.triggerAttackRelease(Tone.Frequency(pitch, 'midi').toFrequency(), '8n', undefined, velocity)

		this.notes.push({ x: e.clientX, y: e.clientY, life: 1 })
	}

	private draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.notes.forEach((n, i) => {
			this.ctx.globalAlpha = n.life
			this.ctx.font = '24px Arial'
			this.ctx.fillText('🎵', n.x, n.y)
			n.life -= 0.02
			if (n.life <= 0) this.notes.splice(i, 1)
		})

		requestAnimationFrame(this.draw)
	}

	// --- Public controls ---
	public play() {
		this.isActive = true
		Tone.Destination.volume.rampTo(0, 0.3)
	}

	public pause() {
		this.isActive = false
		Tone.Destination.volume.rampTo(-Infinity, 1)
	}

	public destroy() {
		window.removeEventListener('mousemove', this.handleMouseMove)
		this.canvas.remove()
		this.synth.dispose()
	}
}
