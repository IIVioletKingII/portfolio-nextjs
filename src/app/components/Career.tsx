'use client'

import CeligoApp from './Celigo/CeligoApp'


export default function Hero() {

	return (
		<section className='border-y-1 border-violet-600 bg-background-light dark:bg-background-dark'>
			<div className="font-sans  items-center justify-items-center my-16 px-16 gap-16">
				<header className='font-bold text-4xl my-16'>
					<span>Career</span>
				</header>
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
				</main>
			</div>
		</section>
	)
}
