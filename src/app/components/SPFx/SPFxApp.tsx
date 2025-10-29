'use client';

import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SPFxWebPartApp from './SPFxWebPart';

export default function SPFxWebPart() {
	const { theme: nextTheme } = useTheme();
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		// next-themes can return "system", "light", or "dark"
		if (nextTheme === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setResolvedTheme(prefersDark ? 'dark' : 'light');
		} else {
			setResolvedTheme(nextTheme as 'light' | 'dark');
		}
	}, [nextTheme]);

	const fluentTheme = resolvedTheme === 'dark' ? webDarkTheme : webLightTheme;

	return (
		<FluentProvider theme={fluentTheme}>
			<SPFxWebPartApp />
		</FluentProvider>
	);
}
