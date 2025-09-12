import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './App.module.scss';
export type AppStateType = {
	fontFamily: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
	fontSize: string;
};

export const App = () => {
	const [appState, setAppState] = useState<AppStateType>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		fontSize: defaultArticleState.fontSizeOption.value,
	});
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamily,
					'--font-size': appState.fontSize,
					'--font-color': appState.fontColor,
					'--container-width': appState.contentWidth,
					'--bg-color': appState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setAppState} />
			<Article />
		</main>
	);
};
