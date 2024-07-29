import { useState, useCallback } from "react";
import { useVariables } from "@/hooks";
import axios from "axios";

export const useAddFilm = () => {
  const { url } = useVariables();
  const path = "film";
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (body: any) => {
    setIsLoading(true);
    setError(null);

    try {
			const response = await axios.post(url + path, body);
      setData(response.data);
    } catch (error) {
      setError(error as Error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, fetchData };
};