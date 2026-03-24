import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='border-t '>
			<div className='container mx-auto px-4 py-1'>
				<div className='flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row'>
					<p className='text-center flex items-center gap-1'>
						Built by{' '}
						<Link
							href='https://github.com/alexrms1'
							target='_blank'
							className='inline-flex items-center gap-1 hover:text-foreground transition'
						>
							<FaGithub />
							<span className='underline decoration-dotted'>alexrms1</span>
						</Link>{' '}
						using Next.js, shadcn/ui, & DexieJS
					</p>

					<div className='flex items-center gap-4'>
						<Link
							href='mailto:alexramosiii.dev@gmail.com'
							className='flex items-center gap-1 hover:text-foreground transition'
						>
							<LuMail />
							<span className='underline decoration-dotted'>Gmail</span>
						</Link>
						<Link
							href='https://www.linkedin.com/in/alexramosiii-dev/'
							target='_blank'
							className='flex items-center gap-1 hover:text-foreground transition'
						>
							<FaLinkedin />
							<span className='underline decoration-dotted'>LinkedIn</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
