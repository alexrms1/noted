'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/dexie/db';
import { useRef, useState } from 'react';
import { LuTrash } from 'react-icons/lu';
import { toast } from 'sonner';

export default function Note({ note }) {
	const [title, setTitle] = useState(note?.title || '');
	const [content, setContent] = useState(note?.content || '');
	const [open, setOpen] = useState(false);

	const handleDeleteNote = async (id: number) => {
		const promise = db.notes.delete(id);
		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted',
			error: 'Problem while deleting note',
		});
	};

	const updateDebounce = useRef<NodeJS.Timeout | null>(null);
	const handleUpdateNote = (id: number, title: string = '', content: string = '') => {
		if (updateDebounce.current) clearTimeout(updateDebounce.current);
		updateDebounce.current = setTimeout(() => {
			db.notes.update(id, { title, content });
		}, 350);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTitle className='sr-only'></DialogTitle>
			<DialogTrigger asChild>
				<Card className={(open ? 'opacity-0' : 'opacity-100') + ' transition-opacity duration-200'} size='sm'>
					<CardHeader>
						<CardTitle>
							<h4 className='break-all overflow-auto font-semibold'>{note?.title}</h4>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className='break-all text-xs'>{note?.content}</pre>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<div className='overflow-auto'>
					<Input
						type='text'
						placeholder='Title'
						className='border-none focus-visible:ring-0 focus-visible:outline-none'
						value={title}
						onChange={(e) => {
							setTitle(e.currentTarget.value);
							handleUpdateNote(note?.id, e.currentTarget.value, note?.content);
						}}
					/>
					<Separator />
					<Textarea
						placeholder='Add content here'
						className='border-none focus-visible:ring-0 focus-visible:outline-none resize-none field-sizing-content text-sm max-h-[60svh]'
						value={content}
						onChange={(e) => {
							setContent(e.currentTarget.value);
							handleUpdateNote(note?.id, note?.title, e.currentTarget.value);
						}}
					/>
				</div>
				<div className='flex justify-between gap-2'>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant={'destructive'}>
								<LuTrash />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent size='sm'>
							<AlertDialogHeader>
								<AlertDialogTitle className='font-bold'>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will delete this note permanently.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction variant={'destructive'} onClick={() => handleDeleteNote(note?.id)}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<DialogClose asChild>
						<Button>Close</Button>
					</DialogClose>
				</div>
			</DialogContent>
			<DialogDescription className='sr-only'></DialogDescription>
		</Dialog>
	);
}
