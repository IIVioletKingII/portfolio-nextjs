'use client'

// import {FontAwesomneIcon} from
const hoverClass = 'hover:text-violet-400';
const linkClasses = `text-3xl ${hoverClass}`;

export default function Hero() {

	return (
		<section className='min-h-[90vh] p-16 flex justify-center items-center gap-16'>
			<div className='max-h-[60%] max-w-4xl flex justify-center items-center gap-16 flex-wrap'>
				<div className="min-w-[300px] overflow-hidden rounded-2xl bg-card flex-1">
					<img className='' src="https://raw.githubusercontent.com/IIVioletKingII/sam-depoule/main/src/assets/sam-110.jpg" alt="" />
				</div>
				<div className="flex flex-col gap-8 font-semibold flex-1">
					<span className="text-5xl font-semibold ">Sam DePoule</span>
					<span className="text-4xl dark:text-gray-300 text-gray-800">
						<span className="dark:text-violet-400 text-violet-700">Full-Stack</span> & <span className="dark:text-violet-400 text-violet-700">Cloud Integration</span> Developer
					</span>
					<div className='flex gap-4'>
						<a href="https://github.com/IIVioletKingII" className={linkClasses}>
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="https://www.linkedin.com/in/samuel-depoule/" className={linkClasses}>
							<i className="fa-brands fa-linkedin"></i>
						</a>
						<a href="mailto:samdepoule@gmail.com" className={linkClasses}>
							<i className="fa-solid fa-envelope"></i>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
