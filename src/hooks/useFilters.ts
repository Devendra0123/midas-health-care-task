import { useState, useCallback, useMemo } from 'react';

interface UseFilterOptions<T> {
  data: T[];
  filters: Record<string, any>;
  filterFunction: (item: T, filters: Record<string, any>) => boolean;
}

interface UseFilterReturn<T> {
  filteredData: T[];
  setFilters: (newFilters: Record<string, any>) => void;
  resetFilters: () => void;
  filters: Record<string, any>;
}

export const useFilter = <T>({
  data,
  filters: initialFilters,
  filterFunction,
}: UseFilterOptions<T>): UseFilterReturn<T> => {
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const filteredData = useMemo(
    () => data.filter((item) => filterFunction(item, filters)),
    [data, filters, filterFunction]
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return { filteredData, setFilters, resetFilters, filters };
};
