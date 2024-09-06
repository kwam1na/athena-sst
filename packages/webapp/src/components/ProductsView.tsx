import Products from "./Products";
import View from "./View";

export default function ProductsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  return (
    <View header={<Navigation />}>
      <Products />
    </View>
  );
}
