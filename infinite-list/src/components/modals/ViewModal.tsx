import React from "react";
import { Modal, Button } from "antd";

interface ViewModalProps {
	visible: boolean;
	onCancel: () => void;
	selectedRepo: any;
}

const ViewModal: React.FC<ViewModalProps> = ({ visible, onCancel, selectedRepo }) => {
	return (
		<Modal
			title={selectedRepo ? selectedRepo.name : ''}
			open={visible}
			onOk={onCancel}
			onCancel={onCancel}
			footer={[
				<Button key="back" onClick={onCancel}>
					Закрыть
				</Button>
			]}
		>
			{selectedRepo && (
				<div>
					<p>
						<strong>Описание:</strong>
						<br />
						{selectedRepo.description}
					</p>
					
					<p>
						<strong>Ссылка:</strong>
						<br />
						<a href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer">
							{selectedRepo.html_url}
						</a>
					</p>
				</div>
			)}
		</Modal>
	);
};

export default ViewModal;