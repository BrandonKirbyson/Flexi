import dayjs from 'dayjs';

export function load({ params }: { params: { slug: string } }) {
	const date = dayjs(params.slug);
	return { date };
}
