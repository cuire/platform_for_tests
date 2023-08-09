"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Divider, Paper } from "@mui/material";
import AddClassHeader from "../AddClassHeader/AddClassHeader";
import AddStudents from "../AddStudents/AddStudents";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback } from "react";
import {
	AddClassActions,
	addClassIsLoadingSelector,
	addClassUsersDataSelector,
	classIsAddedSelector,
	editClassDataSelector,
	editClassIdDataSelector,
} from "@/redux/Class/AddClass";

import styles from "./AddClassBlock.module.css";

export default function AddClassBlock() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const studentsData = useAppSelector(addClassUsersDataSelector);
	const isAddedClass = useAppSelector(classIsAddedSelector);
	const isLoading = useAppSelector(addClassIsLoadingSelector);

	const editClassId = useAppSelector(editClassIdDataSelector || null);
	const editClassData = useAppSelector(editClassDataSelector || null);

	const changeRequestData = (data: any): any => {
		dispatch(AddClassActions.changeRequestData(data));
	};

	const fetchAddClass = useCallback(() => {
		dispatch(AddClassActions.addClass());
	}, [dispatch]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			school: editClassData?.school || "",
			class: editClassData?.class || "",
			people: editClassData?.students || [
				{
					name: "",
					surname: "",
				},
			],
		},
	});

	const onSubmit = (data: any) => {
		let value = { ...data };
		console.log(value);
		if (editClassId) {
			changeRequestData(value);
			dispatch(AddClassActions.editClass());
		} else {
			changeRequestData(data);
			fetchAddClass();
		}
	};

	const routingToClasses = () => {
		dispatch(AddClassActions.changeIsAddedClass(false));
		dispatch(AddClassActions.changeClassIsAddedToFalse());
		router.push("/classes");
	};

	if (isAddedClass) {
		return (
			<>
				<Paper className={styles.addClassBlock__usersDataContainer}>
					{studentsData.length > 0 ? (
						studentsData.map((student) => (
							<div
								key={student._id}
								className={
									styles.addClassBlock__oneUserDataContainer
								}
							>
								<p>Имя: {student.fullName}</p>
								<p>Логин: {student.login}</p>
								<p>Пароль: {student.password}</p>
							</div>
						))
					) : (
						<div
							className={
								styles.addClassBlock__oneUserDataContainer
							}
						>
							<p>Вы не добавили новых учеников</p>
						</div>
					)}
				</Paper>
				<Button variant="contained" onClick={routingToClasses}>
					Готово
				</Button>
			</>
		);
	}

	if (isLoading) {
		return (
			<div className={styles.addClassBlock__loadingContainer}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Paper className={styles.addClass__container}>
			<form
				className={styles.addClass__form}
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<AddClassHeader register={register} />

				<Divider />
				<AddStudents control={control} register={register} />
			</form>
		</Paper>
	);
}
