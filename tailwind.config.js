// tailwind.config.js
module.exports = {
	darkMode: 'class', // enables class-based dark mode
	theme: {
		extend: {
			colors: {
				background: {
					light: '#ffffff',
					dark: '#18181b',
				},
				text: {
					light: '#1e293b',
					dark: '#f8fafc',
				},
				accent: {
					light: '#ae00ff',
					dark: '#8400ff',
				},
				primary: {
					light: '#4f46e5', // indigo-600
					dark: '#818cf8', // indigo-400
				},
				secondary: {
					light: '#f59e0b', // amber-500
					dark: '#fbbf24', // amber-400
				}
			},
		},
	},
	plugins: [],
}
