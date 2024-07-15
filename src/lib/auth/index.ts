import { db } from "$lib/db";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { students } from '$lib/db/schema';

export const getOrCreateUserProfile = async (locals: App.Locals) => {
	const { user } = await locals.safeGetSession();
	console.log("getting student profile", user)

	if (!user) {
		return null;
	}

	const curProfile = await db.query.students.findFirst({
		where: eq(students.id, user.id),
	});

	if (curProfile) {
		return curProfile;
	}

	console.log("metadata", user.user_metadata)
	await db.insert(students).values({
		id: user.id,
		firstName: (user.user_metadata.full_name as string | undefined ?? ' ').split(' ')[0],
		lastName: (user.user_metadata.full_name as string | undefined ?? ' ').split(' ')[1],
		gradYear: 2024,
	})

	const newProfile = await db.query.students.findFirst({
		where: eq(students.id, user.id),
	});

	if (!newProfile) {
		error(500, "Could not create profile");
	}

	return newProfile;
};