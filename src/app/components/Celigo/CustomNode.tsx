// CustomNode.tsx
import React, { memo } from 'react'
import type { Node, NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'

export type CustomNodeData = {
	label?: string
	class?: string
	children?: React.ReactNode
	header?: React.ReactNode
	footer?: React.ReactNode
	[key: string]: unknown
}

import './Celigo.css'

export type CustomNodeType = Node<CustomNodeData, 'customNode'>;

// 3) Use the Node type as the generic for NodeProps
function CustomNode({ data }: NodeProps<CustomNodeType>): React.ReactElement {
	return (
		<div className="bg-white dark:bg-card-dark p-3 rounded-md ring shadow-sm hover:shadow-lg ring-gray-900/5 hover:ring-gray-800 dark:ring-gray-200/9 hover:dark:ring-gray-400" >
			<Handle
				type='target'
				position={Position.Left}
				isConnectable={false}
				className='hidden-handle'
			/>
			{data.label && <span className='font-medium text-sm'>{data.label}</span>}
			<div className="">
				{data.children}
			</div>
			{data.footer && (
				<div className='custom-node-foote'>
					{data.footer}
				</div>
			)}
			<Handle
				type='source'
				position={Position.Right}
				isConnectable={false}
				className='hidden-handle'
			/>
		</div>
	);
}

export default memo(CustomNode);
