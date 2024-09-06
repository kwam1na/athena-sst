import { Link } from "@tanstack/react-router";

const Header = () => {
  return <div className="h-[56px] border-b"></div>;
};

const Sidebar = () => {
  return (
    <section className="w-[300px] flex-none space-y-4 h-full border border-1 rounded-md">
      <Header />

      <div className="flex flex-col space-y-4 px-4">
        {/* <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Products
        </Link> */}
        <Link
          to={"/products"}
          activeProps={{
            className: "font-bold",
          }}
        >
          Products
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
