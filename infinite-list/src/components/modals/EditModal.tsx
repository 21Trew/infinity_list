import React from "react";
import {Modal, Input, Button, Typography} from "antd";

interface EditModalProps {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
	newName: string;
	newDescription: string;
	newUrl: string;
	setNewName: (name: string) => void;
	setNewDescription: (description: string) => void;
	setNewUrl: (url: string) => void;
}

const EditModal: React.FC<EditModalProps> = (
	{
		visible,
		onOk,
		onCancel,
		newName,
		newDescription,
		newUrl,
		setNewName,
		setNewDescription,
		setNewUrl,
	}) => {
	return (
		<Modal
			title="Режим редактирования"
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			footer={[
				<Button key="back" onClick={onCancel}>
					Отмена
				</Button>,
				<Button key="submit" type="primary" onClick={onOk}>
					Сохранить
				</Button>
			]}
		>
			<Typography.Title level={5}>Название</Typography.Title>
			<Input
				placeholder="Введите название"
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
			/>
			
			<Typography.Title level={5}>Описание</Typography.Title>
			<Input
				placeholder="Введите описание"
				value={newDescription}
				onChange={(e) => setNewDescription(e.target.value)}
			/>
			
			<Typography.Title level={5}>Ссылка</Typography.Title>
			<Input
				placeholder="Добавьте ссылку на репозиторий"
				value={newUrl}
				onChange={(e) => setNewUrl(e.target.value)}
			/>
		</Modal>
	);
};

export default EditModal;