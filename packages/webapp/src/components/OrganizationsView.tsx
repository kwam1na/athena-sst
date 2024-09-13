import View from "./View";

export default function OrganizationsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  return (
    <View className="bg-background" header={<Navigation />}>
      <span>Organizations View</span>
    </View>
  );
}
