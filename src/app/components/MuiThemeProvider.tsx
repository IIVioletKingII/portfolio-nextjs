'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useTheme } from 'next-themes'
import { useMemo, useState, useEffect } from 'react'

export default function MuiThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true)
	}, []);

	const muiTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: theme === 'dark' ? 'dark' : 'light',
				},
				typography: {
					fontFamily: 'inherit',
				},
			}),
		[theme]
	);

	if (!mounted) {
		return (
			<div>
				<CssBaseline />
				{children}
			</div>
		)
	}

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
