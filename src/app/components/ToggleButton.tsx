// components/ToggleButton.jsx
'use client'; // This directive marks the component as a Client Component

import { useState } from 'react';

function ToggleButton() {
	const [isOn, setIsOn] = useState(false); // Initialize state for the toggle

	const handleToggle = () => {
		setIsOn(!isOn); // Toggle the state
	};

	return (
		<button
			onClick={handleToggle}
			className={`px-4 py-2 rounded-md transition-colors duration-200 ${isOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
				}`}
		>
			{isOn ? 'ON' : 'OFF'}
		</button>
	);
}

export default ToggleButton;