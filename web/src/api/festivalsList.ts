import { BASE_URL } from "./config";

export interface Festival {
	id: string,
	name: string,
	description: string
}

export const festivalsList = async (
  userId: string
): Promise<Festival[]> => {
  const response = await fetch(`${BASE_URL}/festivals/list`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const result = await response.json();
  if (response.status === 200) {
    return result.festivals;
  } else {
    throw new Error(result.error);
  }
};
