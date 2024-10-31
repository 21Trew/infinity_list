// src/components/RepoList.tsx
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import repoStore from "./RepoStore";
import { Row, Col, Button, Card, Spin, Typography } from "antd";

const { Title } = Typography;

const RepoList: React.FC = observer(() => {
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	
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
	
	return (
		<div style={{ padding: '20px', backgroundColor: '#f5f0ff' }}>
			<Title level={2} style={{ color: '#6f2c91' }}>GitHub Repositories</Title>
			<Row gutter={[16, 16]}>
				{repoStore.repos.map(repo => (
					<Col
						key={repo.id}
						xs={24} // 1 элемент на экранах меньше 425px
						sm={12} // 2 элемента на экранах от 425px до 768px
						md={8}  // 3 элемента на экранах от 768px до 1024px
						lg={6}  // 4 элемента на экранах больше 1024px
					>
						<Card
							title={repo.name}
							extra={
								<div>
									<Button onClick={() => repoStore.deleteRepo(repo.id)} type="link" style={{ color: '#6f2c91' }}>Delete</Button>
									<Button onClick={() => repoStore.editRepo(repo.id, "New Name", "New Description")} type="link" style={{ color: '#6f2c91' }}>Edit</Button>
								</div>
							}
							style={{ backgroundColor: '#e0d3f1', color: '#6f2c91', width: '100%', height: '100%' }} // Фиолетовый фон для карточек
						>
							<p style={{ color: '#4b2c91' }}>{repo.description}</p>
						</Card>
					</Col>
				))}
			</Row>
			{repoStore.loading && <Spin style={{ display: 'block', margin: '20px auto' }} />}
			<div ref={loadMoreRef}></div>
		</div>
	);
});

export default RepoList;