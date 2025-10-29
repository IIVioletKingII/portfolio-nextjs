

import { useState, useEffect, useRef } from 'react';
import {
	ReactFlow,
	Position,
	Background,
	BackgroundVariant,
	type Node,
	type Edge,
	type FitViewOptions,
	type DefaultEdgeOptions,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CeligoHeader from './CeligoHeader';
import './Celigo.css'

import CustomNode, { CustomNodeData } from './CustomNode'

export const nodeTypes = {
	customNode: CustomNode,
}

const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
};

const workFlowExp = 'I have worked on building custom integrations using Celigo\'s integrator.io platform, focusing on data synchronization and workflow automation.';

export const initialNodes: Node<CustomNodeData>[] = [
	{
		id: '1',
		type: 'customNode',
		data: {
			label: 'Builder Core Certification',
			children: <div className='max-w-75'>I participated in Celigo Lift Off earning my Celigo Certification.</div>
		},
		position: { x: 0, y: 0 }, // -y is up, +x is right
		...nodeDefaults
	},
	{
		id: '2',
		type: 'customNode',
		data: {
			label: 'Workflow Experience',
			children: <div className='max-w-100'>{workFlowExp}</div>
		},
		position: { x: 400, y: 100 }, // -y is up, +x is right
		...nodeDefaults
	},
	{
		id: '3',
		type: 'customNode',
		data: {
			label: 'Current Flow Statistics',
			children: <div className='max-w-75'>
				<div>Number of active connections: 22</div>
				<div>Number of data synchronization flows: 10</div>
				<div>Number of webhook flows: 4</div>
			</div>
		},
		position: { x: 400, y: -75 }, // -y is up, +x is right
		...nodeDefaults
	},
	{
		id: '4',
		type: 'customNode',
		data: {
			label: 'API Experience',
			children: <div className='max-w-75'>
				<div>Postman</div>
				<div>Azure Functions</div>
				<div>AWS API Gateway</div>
			</div>
		},
		position: { x: 900, y: -40 }, // -y is up, +x is right
		...nodeDefaults
	},
]

const initialEdges: Edge[] = [
	{
		id: 'e1-2',
		source: '1',
		target: '2'
	},
	{
		id: 'e1-3',
		source: '1',
		target: '3'
	},
	{
		id: 'e2-4',
		source: '3',
		target: '4'
	}
];

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: 'step',
	style: {
		strokeDasharray: '5,5'
	},
};

function flowHeight(width: number, height: number): number {
	if (width >= 2000) return 700;
	if (width >= 900) return 500;
	if (width < 150) return Math.max(300, height);
	return 350;
}

export default function CeligoApp() {

	const containerRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const observer = new ResizeObserver(entries => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setSize({ width, height: flowHeight(width, height) });
			}
		})
		if (containerRef.current) observer.observe(containerRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<div className="cgo">

			<CeligoHeader />

			<div className="relative overflow-hidden rounded-2xl bg-card" ref={containerRef}>
				<div className="relative" style={{
					width: size.width,
					height: size.height
				}}>
					<ReactFlow
						nodes={initialNodes}
						edges={initialEdges}
						fitView
						fitViewOptions={fitViewOptions}
						defaultEdgeOptions={defaultEdgeOptions}
						nodeTypes={nodeTypes}
					>
						<Background
							variant={BackgroundVariant.Dots}
							gap={15}
							size={1}
						/>
					</ReactFlow>
				</div>
				<div className="absolute inset-0 pointer-events-none bg-fade-mask" />
			</div>

		</div>
	);
}