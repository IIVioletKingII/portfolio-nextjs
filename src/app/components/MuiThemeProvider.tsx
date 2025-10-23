'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export default function MuiThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { theme } = useTheme()

	// Memoize theme so it only recalculates when needed
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
	)

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
