import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useCallback, useContext } from 'react';
import { ThemeContext } from '../providers';

export default function ModeToggle() {
  const [theme, setTheme] = useContext(ThemeContext);

  const themeIcon = useCallback(() => {
    if (theme === 'system') {
      return (
        <LaptopIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      );
    }
    if (theme === 'dark') {
      return (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      );
    }
    return (
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    );
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          {themeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
