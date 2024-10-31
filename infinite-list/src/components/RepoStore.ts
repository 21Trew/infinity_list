// src/components/RepoStore.ts
import { makeAutoObservable } from "mobx";
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
	
	constructor() {
		makeAutoObservable(this);
	}
	
	async fetchRepos() {
		this.loading = true;
		try {
			const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`);
			const newRepos = response.data.items;
			
			// Фильтруем дублирующиеся репозитории
			this.repos = [
				...this.repos,
				...newRepos.filter(newRepo => !this.repos.some(existingRepo => existingRepo.id === newRepo.id))
			];
			this.page += 1;
		} catch (error) {
			console.error("Failed to fetch repos", error);
		} finally {
			this.loading = false;
		}
	}
	
	editRepo(id: number, newName: string, newDescription: string) {
		const repo = this.repos.find(repo => repo.id === id);
		if (repo) {
			repo.name = newName;
			repo.description = newDescription;
		}
	}
	
	deleteRepo(id: number) {
		this.repos = this.repos.filter(repo => repo.id !== id);
	}
}

const repoStore = new RepoStore();
export default repoStore;