export function formatDate(dateString: Date): string {
	// const date = new Date(dateString);
	const today = new Date();
	const diffTime = Math.abs(today.getTime() - dateString.getTime());

	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
	// console.log('🚀 ~ file: utils.ts:7 ~ formatDate ~ diffDays:', Math.ceil(1.2));

	if (diffDays <= 12) {
		return `${
			diffDays === 0
				? 'Today'
				: diffDays === 1
				? 'Yesterday'
				: diffDays + ' days ago'
		}`;
	} else {
		return dateString.toLocaleDateString();
	}
}
export function formatLocaleStringWithoutSeconds(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	const dateString = date.toLocaleString(undefined, options);
	return dateString.replace(/:\d{2}\b/g, '');
}
