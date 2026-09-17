function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-blue-950 w-full">
      {/* Page Title */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-white">Employee Management</h2>
      </div>

      {/* User Area */}
      <div className="flex items-center  ">
        <div className="text-right text-white">
          <p className="text-sm font-medium ">Admin User</p>

          <p className="text-xs text-slate-500">Administrator</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
