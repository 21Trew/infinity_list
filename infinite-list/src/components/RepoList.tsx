// src/components/RepoList.tsx
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import repoStore from "./RepoStore";
import { Row, Col, Button, Card, Spin, Typography } from "antd";
import EditModal from "./modals/EditModal.tsx";
import ViewModal from "./modals/ViewModal.tsx";

const { Title } = Typography;

const RepoList: React.FC = observer(() => {
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const [isViewModalVisible, setIsViewModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [selectedRepo, setSelectedRepo] = useState<any>(null);
	const [newName, setNewName] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [newUrl, setNewUrl] = useState('');
	
	useEffect(() => {
		repoStore.fetchRepos();
	}, []);
	
	const handleScroll = () => {
		if (loadMoreRef.current) {
			const { top } = loadMoreRef.current.getBoundingClientRect();
			if (top <= window.innerHeight) {
				repoStore.fetchRepos();
			}
		}
	};
	
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	const showViewModal = (repo: any) => {
		setSelectedRepo(repo);
		setIsViewModalVisible(true);
	};
	
	const showEditModal = (repo: any) => {
		setSelectedRepo(repo);
		setNewName(repo.name);
		setNewDescription(repo.description);
		setNewUrl(repo.html_url);
		setIsEditModalVisible(true);
	};
	
	const handleEditOk = () => {
		if (selectedRepo) {
			repoStore.editRepo(selectedRepo.id, newName, newDescription);
		}
		setIsEditModalVisible(false);
	};
	
	const handleViewCancel = () => {
		setIsViewModalVisible(false);
	};
	
	const handleEditCancel = () => {
		setIsEditModalVisible(false);
	};
	
	const handleDelete = (id: number) => {
		repoStore.deleteRepo(id);
	};
	
	return (
		<div style={{ padding: '20px' }}>
			<Title level={2} style={{ color: '#6f2c91', margin: '0 0 20px' }}>GitHub Repositories</Title>
			<Row gutter={[16, 16]}>
				{repoStore.repos.map(repo => (
					<Col
						key={repo.id}
						xs={24}
						sm={12}
						md={8}
						lg={6}
					>
						<Card
							title={<a onClick={() => showViewModal(repo)} style={{ color: '#6f2c91' }}>{repo.name}</a>}
							extra={
								<div>
									<Button onClick={() => handleDelete(repo.id)} type="link" style={{ color: '#6f2c91' }}>Delete</Button>
									<Button onClick={() => showEditModal(repo)} type="link" style={{ color: '#6f2c91' }}>Edit</Button>
								</div>
							}
							style={{ backgroundColor: '#e0d3f1', color: '#6f2c91', width: '100%', height: '100%' }}
						>
							<p style={{ color: '#4b2c91' }}>{repo.description}</p>
						</Card>
					</Col>
				))}
			</Row>
			{repoStore.loading && <Spin style={{ display: 'block', margin: '20px auto' }} />}
			<div ref={loadMoreRef}></div>
			
			<ViewModal
				visible={isViewModalVisible}
				onCancel={handleViewCancel}
				selectedRepo={selectedRepo}
			/>
			
			<EditModal
				visible={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleEditCancel}
				newName={newName}
				newDescription={newDescription}
				newUrl={newUrl}
				setNewName={setNewName}
				setNewDescription={setNewDescription}
				setNewUrl={setNewUrl}
			/>
		</div>
	);
});

export default RepoList;