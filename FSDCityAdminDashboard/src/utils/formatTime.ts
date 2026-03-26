/**
 * Format a timestamp as an absolute date and time string (e.g., "Mar 7, 2026 at 2:30 PM")
 * @param timestamp - ISO timestamp string or Date object
 * @returns Formatted date/time string
 */
export function formatRelativeTime(timestamp: string | Date | null | undefined): string {
    if (!timestamp) {
        return 'Unknown time';
    }

    try {
        const then = new Date(timestamp);

        if (isNaN(then.getTime())) {
            console.warn('Invalid timestamp:', timestamp);
            return 'Invalid date';
        }

        const date = then.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const time = then.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return `${date} at ${time}`;
    } catch (error) {
        console.error('Error formatting time:', error, 'for timestamp:', timestamp);
        return 'Unknown time';
    }
}
