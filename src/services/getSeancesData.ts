import { useState, useEffect, useCallback } from "react";

export const getSeancesData = (url: string, body?: any) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

			try {
				const response = await fetch(url, {
					method: "GET",
					body: JSON.stringify(body),
				});
				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}
				const result = await response.json();
				setData(result);
			} catch (error) {
				setError(error as Error);
				console.error(error);
			} finally {
				setIsLoading(false);
			}

  }, [url]);

  useEffect(() => {
			fetchData();
  }, []);

  return { data, error, isLoading };
};
