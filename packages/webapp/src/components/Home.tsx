import View from "./View";

export default function Home() {
  const Navigation = () => {
    return (
      <div className="flex gap-2">
        <div className="w-[80px] h-[40px] bg-red-400"></div>
        <div className="w-[80px] h-[40px] bg-green-400"></div>
      </div>
    );
  };

  const renderLander = () => (
    <div className="flex flex-col">
      {/* {[...Array(80)].map((_, i) => (
        <p key={i} className="mb-4">
          Note {i + 1}
        </p>
      ))} */}
    </div>
  );

  return <View header={<Navigation />}>{renderLander()}</View>;
}
