'use client'

import Hero from './components/Hero'
import Career from './components/Career'

export default function Home() {

	return (
		<div className=''>
			<div className="hero-bg-grid fixed h-full inset-0 z-[-1]"></div>

			{/* <Hero></Hero> */}
			<Career></Career>

			<div className="p-25"></div>
		</div>
	);
}