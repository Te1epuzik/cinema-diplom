import { useState, useCallback } from "react";
import { useVariables } from "@/hooks";
import axios from "axios";

type TOptions = {
	method: "post" | "delete";
	body?: any;
	hallId?: number;
}

export const useSetHall = () => {
  const { url } = useVariables();
  const path = "hall";
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (options: TOptions) => {
			const { method, body, hallId } = options;
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios[method ? method : "post"](
          options.hallId ? url + path + "/" + hallId : url + path,
          body && body,
        );
        setData(response.data);
      } catch (error) {
        setError(error as Error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, error, isLoading, fetchData };
};
