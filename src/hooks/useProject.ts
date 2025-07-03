import { mockProjects } from "@/mockData/projects";
import { useQuery } from "@tanstack/react-query";

export const useUserProjects = () => {
  return useQuery({
    queryKey: ["userProjects"],
    queryFn: getUserProjects,
    staleTime: 5 * 60 * 1000,
  });
};

const getUserProjects = async () => {
  return mockProjects;
};
