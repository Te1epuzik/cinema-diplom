type TVariables = {
	url: string;
	mail: string;
	password: string;
}

export const useVariables = () => {
	const variables: TVariables = {
		url: "https://shfe-diplom.neto-server.ru/",
		mail: "shfe-diplom@netology.ru",
		password: "shfe-diplom",
	}

	return variables;
}
