export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const today = new Date();
	const diffTime = Math.abs(today.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays <= 12) {
		return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
	} else {
		return dateString;
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
