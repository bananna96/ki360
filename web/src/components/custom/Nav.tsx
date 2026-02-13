'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export interface NavLink {
  name: string;
  href: string;
}

interface NavProps {
  links: NavLink[];
}

export default function Nav({ links }: NavProps) {
const pathname = usePathname();
  return (
    <nav className="bg-[var(--color-frost)] w-full flex h-[3em] items-center justify-between rounded-md p-3 fixed">
        <Image
          src="/Logo.png"
          alt="ki360 logomark small"
          className="h-full w-auto"
          width={100}
          height={100}
          />
          <div>
        {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex justify-end ${pathname === link.href ? " font-bold" : ""}`}
          >
            <span className="">{link.name}</span>
          </Link>
        );
      })}
      </div>
    </nav>
  );
}