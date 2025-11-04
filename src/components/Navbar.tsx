const Navbar = () => {
  return (
    <nav className="border-b border-(--color-border)">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-base font-semibold tracking-tight text-(--color-foreground)">
            Attendance
          </h1>
          <span className="text-sm text-(--color-muted-foreground)">
            / Track
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
