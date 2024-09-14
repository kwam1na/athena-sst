import View from "./View";
import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations } from "@/api/organization";
import SingleLineError from "./states/error/SingleLineError";
import Spinner from "./ui/spinner";

export default function OrganizationsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <span>Organizations View</span>
      </div>
    );
  };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  return (
    <View className="bg-background" header={<Navigation />}>
      {isLoading && <Spinner />}
      {error && <SingleLineError message={error.message} />}
    </View>
  );
}
