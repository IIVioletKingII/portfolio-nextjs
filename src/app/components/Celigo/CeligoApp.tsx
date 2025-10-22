import { useState, useCallback } from 'react';
import {
	ReactFlow,
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	Position,
	Background,
	BackgroundVariant,
	type Node,
	type Edge,
	type FitViewOptions,
	type OnConnect,
	type OnNodesChange,
	type OnEdgesChange,
	type OnNodeDrag,
	type DefaultEdgeOptions,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
};

const initialNodes: Node[] = [
	{
		id: '1',
		data: { label: 'Node 1' },
		position: { x: 5, y: 0 },
		...nodeDefaults
	},
	{
		id: '2',
		data: { label: 'Node 2' },
		position: { x: 200, y: 25 },
		...nodeDefaults
	},
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
};

const onNodeDrag: OnNodeDrag = (_, node) => {
	console.log('drag event', node.data);
};

export default function CeligoApp() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes],
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges],
	);

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			onNodeDrag={onNodeDrag}
			fitView
			fitViewOptions={fitViewOptions}
			defaultEdgeOptions={defaultEdgeOptions}
		>
			<Background
				variant={BackgroundVariant.Dots}
				gap={15}
				size={1}
			/>
		</ReactFlow>
	);
}