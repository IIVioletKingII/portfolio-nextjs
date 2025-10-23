'use client'

import CeligoApp from './Celigo/CeligoApp'


export default function Hero() {

	return (
		<section className='border-y-1 border-violet-600 bg-background-light dark:bg-background-dark'>
			<div className="font-sans items-center justify-items-center my-16 px-16 gap-16">
				<header className='font-bold text-4xl my-16'>
					<span>Career</span>
				</header>
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">

					<div className='font-bold text-2xl'>
						Celigo Flow Editor
					</div>
					{/* card */}
					<div className="bg-white dark:bg-card-dark rounded-2xl ring shadow-xl ring-gray-900/5 w-full" >
						<CeligoApp />
					</div>
				</main>
			</div>
		</section>
	)
}
