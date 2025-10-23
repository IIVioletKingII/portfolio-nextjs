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
import ToggleButton from '../ToggleButton'
import MuiThemeProvider from '../MuiThemeProvider';
import Divider from '@mui/material/Divider';
import { Analytics, Play, Dropdown, Calendar, Settings, DotHor, Cross } from './CeligoIcons'
import './Celigo.css'

import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Switch, { SwitchProps } from '@mui/material/Switch';

const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
};

const TailwindTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip placement='top' arrow {...props} slotProps={{
		tooltip: {
			'className': '!text-white dark:!text-gray-950 !bg-black dark:!bg-white'
		}, arrow: {
			'className': '!text-gray-950 dark:!text-white'
		}
	}} />
))(() => ({
}));


const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	'& .MuiSwitch-track': {
		borderRadius: 22 / 2,
		'&::before, &::after': {
			content: '""',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			width: 16,
			height: 16,
		},
		'&::before': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main),
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		'&::after': {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main),
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: 'none',
		width: 16,
		height: 16,
		margin: 2.25,
	},
}));

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

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [flowEnabled, setFlowEnabled] = useState(false);

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

	const flowEnabledText = flowEnabled ? 'Your flow is currently enabled.\nDisable your flow to use test mode, where you can run tests with mock data.' : 'Your flow is disabled. Enable the flow to transfer data.';

	return (
		<div className="cgo">
			<MuiThemeProvider>

				<header className="w-full flex flex-row gap-2 align-center px-1 my-4 gap-4">
					<div className="ml-auto"></div>
					<span className="inline-flex" data-state="closed" aria-label="View analytics">
						<button className="inline-flex items-center justify-center shrink-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background font-display transition-colors empty:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focusRingBorder focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none focus-visible:bg-surface-elevated hover:bg-surface-elevated hover:text-default disabled:text-default-disabled shadow-none h-9 w-9 [&amp;&gt;svg]:disabled:fill-icon-default-disabled [&amp;&gt;svg]:fill-icon-default [&amp;&gt;svg]:w-lg [&amp;&gt;svg]:h-lg" data-test="charts">
							<Analytics />
						</button>
					</span>
					<span><Divider className='py-3' orientation="vertical" /></span>
					<div className="">
						<TailwindTooltip title={flowEnabledText}>
							<Android12Switch />
						</TailwindTooltip>
					</div>

					<div className="cgo-button dark-outline switch inline-flex p-[2px] box-border gap-3xs shadow-sm h-9 rounded-[6px] gap-[2px]">
						<TailwindTooltip title='Run flow with all sources'>
							<button className="cgo-button transition-colors h-[30px] aspect-1/1 rounded-l-[4px] rounded-r-none cursor-pointer">
								<Play />
							</button>
						</TailwindTooltip>

						<Divider className='' orientation="vertical" flexItem />

						<TailwindTooltip title="Run flow with single source">
							<button className="cgo-button transition-colors h-[30px] aspect-1/1 rounded-r-[4px] rounded-l-none cursor-pointer">
								{/* <CalendarMonthOutlinedIcon /> */}
								<div style={{ transform: dropdownOpen ? 'rotate(180deg)' : '' }}>
									<Dropdown />
								</div>
							</button>
						</TailwindTooltip>
					</div>

					<span><Divider className='py-3' orientation="vertical" /></span>

					<TailwindTooltip title="Add schedule">
						<button className="cgo-button light-outline fill transition-colors h-9 w-9  rounded-sm cursor-pointer">
							<Calendar />
						</button>
					</TailwindTooltip>
					<TailwindTooltip title="Settings" placement='top' arrow>
						<button className="cgo-button light-outline fill transition-colors h-9 w-9 rounded-sm cursor-pointer" >
							<Settings />
						</button>
					</TailwindTooltip>
					<button type="button" className="cgo-button transition-colors h-9 w-9 rounded-sm cursor-pointer" >
						<DotHor />
					</button>

					<span><Divider className='py-3' orientation="vertical" /></span>

					<TailwindTooltip title="Exit flow & return to all integration flows" >
						<button className="cgo-button transition-colors h-7 w-7 rounded-sm cursor-pointer" data-test="close-flow-builder">
							<Cross />
						</button>
					</TailwindTooltip>
					<span data-state="closed" aria-label="Exit flow &amp; return to all integration flows">
					</span>
				</header>
				<div className="relative overflow-hidden rounded-2xl bg-card">
					<div className="relative w-150 aspect-5/3">
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
					</div>
					<div className="absolute inset-0 pointer-events-none bg-fade-mask" />
				</div>

			</MuiThemeProvider>
		</div>
	);
}