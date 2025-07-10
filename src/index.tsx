import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type AppStateType = {
	fontFamily: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
	fontSize: string;
};

const App = () => {
	const [appState, setAppState] = useState<AppStateType>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		fontSize: defaultArticleState.fontSizeOption.value,
	});
	return (
		<main
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
