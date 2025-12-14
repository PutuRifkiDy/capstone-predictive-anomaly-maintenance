import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

	return (
		<Button onClick={toggleTheme} variant="none" className="rounded-full flex items-center w-12 h-12 dark:bg-[#515DEF]/10">
			<div
				className={`flex items-center gap-x-2 transition-transform duration-500`}
			>
				{theme === 'dark' ? (
					<SunIcon className="!h-7 !w-7 text-yellow-400" />
				) : (
					<MoonIcon className="!h-7 !w-7 text-[#515DEF]" />
				)}
			</div>
		</Button>
	);
}
