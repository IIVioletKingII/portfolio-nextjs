'use client'

import CeligoApp from './Celigo/CeligoApp';

export default function Hero() {

	return (
		<section className='border-y-1 border-violet-600 bg-background-light dark:bg-background-dark'>
			<div className="font-sans items-center justify-items-center my-16 px-16 gap-16">
				<header className='font-bold text-4xl my-16'>
					<span>Career</span>
				</header>
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">

					<div className='flex w-full items-center justify-between gap-4'>
						<div className='font-bold text-2xl'>
							Integration Developer
						</div>
						<div className="text-xl dark:text-gray-400 text-gray-600">
							January 2025 - Present
						</div>
					</div>
					{/* card */}
					<div className="bg-white dark:bg-card-dark rounded-2xl ring shadow-xl ring-gray-900/5 w-full" >
						<CeligoApp />
					</div>

					<div className='flex w-full items-center justify-between gap-4'>
						<div className='font-bold text-2xl'>
							Full-Stack Developer
						</div>
						<div className="text-xl dark:text-gray-400 text-gray-600">
							June 2022 - Present
						</div>
					</div>
					{/* card */}
					<div className="bg-white dark:bg-card-dark rounded-2xl ring shadow-xl ring-gray-900/5 w-full p-4" >

						<div>
							<a href="https://iivioletkingii.github.io/IEMTracker"
								target='_blank'
								rel='noopener noreferrer'
								className={`text-violet-600 hover:text-violet-800 underline dark:text-violet-300 hover:dark:text-violet-400`}><span>IEM Tracker Website</span></a>
						</div>

						<div>
							To help my community, I developed a React + AWS website to help their production team organize and loan In-Ear Monitors (earbuds) to volunteers on their worship team.
							<span className='text-gray-500 dark:text-gray-400 ml-2'>React, GitHub Pages, AWS Lambda, AWS DynamoDB</span>
						</div>

					</div>

					<div className='flex w-full items-center justify-between gap-4'>
						<div className='font-bold text-2xl'>
							Audio Engineer
						</div>
						<div className="text-xl dark:text-gray-400 text-gray-600">
							February 2020 - Present
						</div>
					</div>
					{/* card */}
					<div className="bg-white dark:bg-card-dark rounded-2xl ring shadow-xl ring-gray-900/5 w-full p-4" >
						I volunteer 3-4 times per week with Sunday Services, rehearsals, and outside events wherever help is needed - Audio (A&H), Camera, Lighting (Vista 3, GrandMA 3), Video Slides (ProPresenter), Singing, or playing Piano
					</div>
				</main>
			</div>
		</section>
	)
}
