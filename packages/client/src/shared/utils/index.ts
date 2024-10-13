export const localizeValue = (value: number, currency: string) => `
  ${value.toLocaleString("de-DE", {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}
`;

export const normalizeData = <T extends Record<string, any>>(
	arr: T[] | undefined,
	key: keyof T,
): { ids: string[]; byId: Record<string, T> } => {
	if (!arr) return { ids: [], byId: {} };
	const ids: string[] = [];
	const byId: Record<string, T> = arr.reduce(
		(prev, curr) => {
			prev[curr[key] as string] = curr;
			ids.push(curr[key] as string);
			return prev;
		},
		{} as Record<string, T>,
	);

	return { ids, byId };
};

export const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	})
};