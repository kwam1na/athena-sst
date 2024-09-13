import { useNavigate } from "@tanstack/react-router";
import View from "./View";
import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations } from "@/api/organization";
import { useEffect } from "react";

export default function Home() {
  const Navigation = () => {
    return <div className="flex gap-2 h-[40px]"></div>;
  };

  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      const organization = data[0];

      navigate({
        to: "/organization/$orgName",
        params: (prev) => ({ ...prev, orgName: organization.organizationUrl }),
      });
    }
  }, [data]);

  return (
    <View header={<Navigation />}>
      <span>Home</span>
    </View>
  );
}
