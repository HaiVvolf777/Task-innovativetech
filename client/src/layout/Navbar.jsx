import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isViewUserPage = location.pathname === "/";
  const linkPath = isViewUserPage ? "/create-user" : "/";
  const linkText = isViewUserPage ? "Create User" : "View Users";
//   Conditional rendering

  return (
    <>
      <nav className="top-0 z-100 bg-[#0A2741] w-full">
        <div className="container mx-auto px-[30px] flex justify-between lg:py-1">
          <div className="flex justify-between items-center h-[10vh] w-full">
            <div className="flex-shrink-0 flex items-center z-10">
              <Link to="/" className="text-3xl font-bold text-white">
                InnovativeTech Task
              </Link>
            </div>

            <div className="hidden lg:block sm:ml-6">
              <div className="flex items-center space-x-4">
                <Link
                  to={linkPath}
                  className="px-3 py-2 select-none text-white font-bold hover:text-blue-500 transition-colors duration-300"
                >
                  {linkText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
