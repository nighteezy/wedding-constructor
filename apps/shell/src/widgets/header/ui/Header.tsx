import { Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/invitation", label: "Приглашение" },
] as const;

export function Header() {
  return (
    <header className="p-4 flex gap-4 bg-white shadow">
      {navItems.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          {label}
        </Link>
      ))}
    </header>
  );
}
