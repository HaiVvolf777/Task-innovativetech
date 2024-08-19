const Loader = () => {
  return (
    <div className="h-[100vh] w-[100%] absolute top-0 z-[1000] bg-[#001f36]">
      <div className="flex justify-center items-center h-screen">
        <div className="w-24 h-24 rounded-full animate-spin border-x-4 border-dashed border-[#4EDC97] border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
