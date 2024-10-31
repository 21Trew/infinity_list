import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

interface Repo {
	id: number;
	name: string;
	description: string;
}

class RepoStore {
	repos: Repo[] = [];
	page: number = 1;
	loading: boolean = false;
	error: string | null = null;
	
	constructor() {
		makeAutoObservable(this);
	}
	
	async fetchRepos() {
		if (this.loading) return;
		
		const token = import.meta.env.VITE_GITHUB_TOKEN;
		
		runInAction(() => {
			this.loading = true;
			this.error = null;
		});
		
		try {
			const response = await axios.get(
				`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`,
				{
					headers: {
						'Authorization': `${token}`, // изменено с Bearer на token
						'Accept': 'application/vnd.github.v3+json'
					}
				}
			);
			
			runInAction(() => {
				const newRepos = response.data.items;
				this.repos = [
					...this.repos,
					...newRepos.filter(newRepo =>
						!this.repos.some(existingRepo => existingRepo.id === newRepo.id)
					)
				];
				this.page += 1;
			});
		} catch (error) {
			runInAction(() => {
				if (axios.isAxiosError(error)) {
					this.error = error.response?.data?.message || 'Failed to fetch repositories';
					console.error("Error details:", {
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data
					});
				} else {
					this.error = 'An unexpected error occurred';
					console.error("Failed to fetch repos:", error);
				}
			});
		} finally {
			runInAction(() => {
				this.loading = false;
			});
		}
	}
	
	editRepo = (id: number, newName: string, newDescription: string) => {
		runInAction(() => {
			const repo = this.repos.find(repo => repo.id === id);
			if (repo) {
				repo.name = newName;
				repo.description = newDescription;
			}
		});
	}
	
	deleteRepo = (id: number) => {
		runInAction(() => {
			this.repos = this.repos.filter(repo => repo.id !== id);
		});
	}
}

const repoStore = new RepoStore();
export default repoStore;