/**
 * Fetches the star count for a GitHub repository
 * @param owner - GitHub repository owner
 * @param repo - GitHub repository name
 * @returns Promise<number> - The number of stars
 */
export async function fetchGitHubStars(
  owner: string,
  repo: string,
): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    throw error;
  }
}
