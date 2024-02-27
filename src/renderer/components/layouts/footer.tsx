import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="border-t md:px-8 md:py-0 ">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-8 md:flex-row">
        <Link
          to="/dashboard"
          className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          Built by {` ${siteConfig.author}`}. To execute the trade when
          notification occured.
        </Link>
      </div>
    </footer>
  );
}
