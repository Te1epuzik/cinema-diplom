import { useState, useCallback } from "react";
import { useVariables } from "@/hooks";
import axios from "axios";

type TOptions = {
  method: "post" | "delete";
  body?: any;
  hallId?: number;
};

export const useSetPrice = () => {
  const { url } = useVariables();
  const path = "price";
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (hallId: number, body: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        url + path + "/" + hallId,
        body,
      );
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
