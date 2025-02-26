const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
      <span className="ml-2 text-sm text-white font-medium">Cargando...</span>
    </div>
  );
};

export default Loading;
