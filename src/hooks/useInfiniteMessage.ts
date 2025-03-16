import { useInfiniteQuery } from "@tanstack/react-query"

export const useInfiniteMessage = () => {
  return useInfiniteQuery({
      queryKey : ['messages'],
      queryFn: async ({pageParam = 1}=> {
        const response = await fetch(`/api/messages?page=${pageParam}&limit=3`);
        return response.json();
      }, 
      getNextPageParam : (lastPage) => lastPage.nextPage ?? undefined, 
      initialPageParam : 1
    )
  })
}

