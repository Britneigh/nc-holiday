export const formatDateTime = (isoString: string, timeZone: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-GB', {
        timeZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};