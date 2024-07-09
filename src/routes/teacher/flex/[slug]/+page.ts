import dayjs from 'dayjs';

export function load({ params }) {
	// const date = dayjs(	$params.slug as string);
	const date = dayjs();
	return { date };
}
