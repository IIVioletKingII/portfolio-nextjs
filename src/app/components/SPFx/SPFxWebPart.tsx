'use client';

import {
	JSXElement,
	Body2,
	// Card,
	MessageBar,
	MessageBarBody,
	MessageBarActions,
	MessageBarTitle,
	Button
} from '@fluentui/react-components';
import {
	VerticalBarChart,
	VerticalBarChartDataPoint
} from "@fluentui/react-charts";
import { DismissRegular } from "@fluentui/react-icons";
import {
	useRef,
	useState,
	useEffect
} from 'react';

const AlertBar = (): JSXElement => (
	<MessageBar>
		<MessageBarBody>
			<MessageBarTitle className='mr-2'>SPFx Speciality</MessageBarTitle>
			{/* <Subtitle2> */}
			I build SharePoint Framework (SPFx) web parts and extensions using React and TypeScript.
			{/* </Subtitle2> */}
		</MessageBarBody>
		<MessageBarActions
			containerAction={
				<Button
					aria-label="dismiss"
					appearance="transparent"
					icon={<DismissRegular />}
				/>
			}
		>
			{/* <Button>Action</Button> */}
		</MessageBarActions>
	</MessageBar>
);

const COLOR_MAP = {
	pink: "#E650AF",
	violet: "#627CEF",
	cyan: "#0E7878",
	green: "#04ba3a",
	orange: "#fcb632",
	gold: "#ffd166",
};

const labels = ['Num of SPFx Projects', 'Web Parts', 'Extensions', 'Azure Functions'];

const points: VerticalBarChartDataPoint[] = [
	{
		x: labels[0],
		y: 4,
		color: COLOR_MAP.pink,
		legend: labels[0]
	},
	{
		x: labels[1],
		y: 3,
		color: COLOR_MAP.cyan,
		legend: labels[1]
	},
	{
		x: labels[2],
		y: 1,
		color: COLOR_MAP.violet,
		legend: labels[2]
	},
	{
		x: labels[3],
		y: 1,
		color: COLOR_MAP.green,
		legend: labels[3]
	}
];

export default function SPFxWebPart() {
	const [isClient, setIsClient] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimension, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Efficient resize detection using ResizeObserver
	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new ResizeObserver(entries => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});

		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);


	return (
		<div className="p-4">
			<AlertBar></AlertBar>

			<header className="font-bold text-xl my-4">
				<span>SharePoint Framework (SPFx) Web Parts & Extensions</span>
			</header>

			<div className="my-4">
				<Body2>
					Because of my {"company's"} move to sharepoint I have spearheaded
					the development of several SPFx web parts and extensions to help
					improve productivity and streamline processes. I have also started
					integrating Azure Functions with other company endpoint like <b>Acumatica{" "}</b>
					and <b>Celigo{" "}</b> to help automate tasks and widen the reach of our SPFx solutions.
				</Body2>
			</div>

			<div className="" ref={containerRef}>


				{/* <Card className='mt-6'> */}
				{isClient && (
					<VerticalBarChart
						chartTitle="SPFx Experience"
						culture={
							typeof window !== "undefined" ? window.navigator.language : "en-us"
						}
						data={points}
						// hideLegend={true}
						rotateXAxisLables={true}
						roundCorners={true}
					/>
				)}
				{/* </Card> */}
			</div>
		</div>
	);
}
