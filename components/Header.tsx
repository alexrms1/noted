'use client';

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import Link from 'next/link';
import { LucideMenu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';

export default function Header() {
	const pathname = usePathname();

	return (
		<header className='border-b'>
			<div className='container mx-auto flex h-12 items-center justify-between px-4 '>
				{/* Logo */}
				<div className='font-bold text-xl'>
					<Link href={'/'}>Noted</Link>
				</div>

				<nav className='hidden md:flex gap-6 items-center'>
					<Link
						href='/'
						className={pathname === '/' ? 'underline-offset-4 underline decoration-accent-foreground' : ''}
					>
						Home
					</Link>
					<Link
						href='/about'
						className={pathname === '/about' ? 'underline-offset-4 underline decoration-accent-foreground' : ''}
					>
						About
					</Link>
					<ModeToggle />
				</nav>

				<div className='flex md:hidden items-center gap-2'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' className='md:hidden'>
								<LucideMenu />
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<nav className='flex flex-col gap-4 mt-6'>
								<Link href='/'>Home</Link>
								<Link href='/about'>About</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
