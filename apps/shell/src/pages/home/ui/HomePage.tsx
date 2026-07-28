import { Button } from "@wedding/ui";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">Наш свадебный сайт</h1>
      <p className="mt-4 text-gray-600">Скоро здесь будет hero с датой и местом</p>
      <Button asChild className="mt-6">
        <Link to="/invitation">Открыть приглашение</Link>
      </Button>
    </div>
  );
}
