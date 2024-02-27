import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import { navsConfig } from '@/config/navs';

export default function MainNav() {
  const location = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.Logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {navsConfig.mainNav.map((item) => (
          <Link
            key={item.title}
            to={item.href || '/'}
            className={cn(
              'transition-colors hover:text-foreground/80',
              location.pathname === item.href
                ? 'text-foreground'
                : 'text-foreground/60',
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
