import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import * as settings from '../../constants/articleProps';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AppStateType } from 'src/index';

type ArticleParamsFormProps = {
	onSubmit: (newState: AppStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState<settings.ArticleStateType>(
		settings.defaultArticleState
	);

	const asideRef: MutableRefObject<null | HTMLElement> = useRef(null);

	function handleReset() {
		setFormState(settings.defaultArticleState);
	}

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		props.onSubmit({
			fontFamily: formState.fontFamilyOption.value,
			fontColor: formState.fontColor.value,
			fontSize: formState.fontSizeOption.value,
			backgroundColor: formState.backgroundColor.value,
			contentWidth: formState.contentWidth.value,
		});
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				!asideRef.current?.contains(event.target as HTMLElement) &&
				document.contains(event.target as HTMLElement)
			) {
				setIsOpen(false);
				document.removeEventListener('click', handleClickOutside);
			}
		};
		if (isOpen) {
			setTimeout(
				() => document.addEventListener('click', handleClickOutside),
				1
			);
		}
		asideRef.current?.classList.toggle(styles.container_open);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen]);

	function handleToggleSidebar() {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			<aside ref={asideRef} className={styles.container}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/*font-family select*/}
					<Select
						selected={formState.fontFamilyOption}
						options={settings.fontFamilyOptions}
						title={'Шрифт'}
						onChange={(selected: settings.OptionType) => {
							setFormState({ ...formState, fontFamilyOption: selected });
						}}
					/>

					{/*font-size select*/}
					<RadioGroup
						name={'font-size'}
						options={settings.fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected: settings.OptionType) => {
							setFormState({ ...formState, fontSizeOption: selected });
						}}
						title={'Размер шрифта'}
					/>

					{/*font-size select*/}
					<Select
						selected={formState.fontColor}
						options={settings.fontColors}
						title={'Цвет Шрифта'}
						onChange={(selected: settings.OptionType) => {
							setFormState({ ...formState, fontColor: selected });
						}}
					/>
					{/*separator*/}
					<Separator />
					{/*background color select*/}
					<Select
						selected={formState.backgroundColor}
						options={settings.backgroundColors}
						title={'Цвет фона'}
						onChange={(selected: settings.OptionType) => {
							setFormState({ ...formState, backgroundColor: selected });
						}}
					/>

					{/*content width select*/}
					<Select
						selected={formState.contentWidth}
						options={settings.contentWidthArr}
						title={'Цвет фона'}
						onChange={(selected: settings.OptionType) => {
							setFormState({ ...formState, contentWidth: selected });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
