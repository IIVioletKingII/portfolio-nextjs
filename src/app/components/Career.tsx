'use client'

import CeligoApp from './Celigo/CeligoApp';
import SPFxApp from './SPFx/SPFxApp';
import Image from 'next/image';

export default function Hero() {

	return (
		<section className='border-y-1 border-violet-600 bg-background-light dark:bg-background-dark'>
			<div className="font-sans items-center justify-items-center my-16 px-16 gap-16">
				<header className='font-bold text-4xl my-16'>
					<span>Career</span>
				</header>
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-7xl m-auto">

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
						<div className="flex flex-row gap-8 flex-wrap">
							<div className="flex-1 min-w-[350px] rounded-sm overflow-hidden">
								<SPFxApp />
							</div>

							<div className='flex-1 min-w-[350px] p-4 w-full flex flex-col'>
								<a href="https://iivioletkingii.github.io/IEMTracker"
									target='_blank'
									rel='noopener noreferrer'
									className={`text-violet-600 hover:text-violet-800 underline dark:text-violet-300 hover:dark:text-violet-400`}><span>IEM Tracker Website</span></a>

								<div className='my-2'>
									To help my community, I developed a React + AWS website to help their production team organize and loan In-Ear Monitors (earbuds) to volunteers on their worship team.
								</div>

								<div className='text-gray-500 dark:text-gray-400 w-full my-2'>React, GitHub Pages, AWS Lambda, AWS DynamoDB, AWS Cognito</div>

								<div className='h-full flex justify-center mt-4 min-h-[400px]'>
									<div className='w-full h-full relative max-w-sm'>

										<Image
											className='rounded-2xl absolute inset-0 w-full h-full object-cover object-top'
											src="/pictures/iemtracker_users_1.png"
											alt=""
											width={500}
											height={600}
											priority
										/>
									</div>
								</div>
							</div>
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
