import { useNavigate } from "@tanstack/react-router";
import View from "./View";
import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations } from "@/api/organization";
import { useEffect } from "react";
import SingleLineError from "./states/error/SingleLineError";

export default function Home() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <span>Home</span>
      </div>
    );
  };

  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  useEffect(() => {
    if (data) {
      const organization = data[0];

      navigate({
        to: "/organization/$orgUrlSlug",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: organization.organizationUrlSlug,
        }),
      });
    }
  }, [data]);

  return (
    <View header={<Navigation />}>
      {error && <SingleLineError message={error.message} />}
    </View>
  );
}
