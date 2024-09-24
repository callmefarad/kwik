import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

interface NoDataFoundProps {
	title?: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
}

export default function NoDataFound({
	title = "No Data Found",
	description = "We couldn't find any data matching your criteria.",
	actionLabel = "Clear Filters",
	onAction,
}: NoDataFoundProps = {}) {
	return (
		<div className='flex flex-col items-center justify-center p-8 text-center'>
			<FileQuestion className='w-16 h-16 text-gray-400 mb-4' />
			<h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
				{title}
			</h2>
			<p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md'>
				{description}
			</p>
			{onAction && (
				<Button onClick={onAction} variant='outline'>
					{actionLabel}
				</Button>
			)}
		</div>
	);
}
