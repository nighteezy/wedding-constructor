import { Button } from "@wedding/ui";
import { useWedding } from "@wedding/api-client";
import { Link } from "react-router-dom";

export function HomePage() {
  const { data: wedding, isLoading, isError, error } = useWedding();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-600">Загрузка...</p>
      </div>
    );
  }

  if (isError || !wedding) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Не удалось загрузить данные"}
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <p className="text-sm uppercase tracking-widest text-primary">
        Мы женимся
      </p>
      <h1 className="mt-4 text-5xl font-serif font-bold text-gray-900">
        {wedding.couple.displayName}
      </h1>
      <p className="mt-6 text-xl text-gray-700">{wedding.date.display}</p>
      <p className="mt-2 text-gray-600">
        {wedding.venue.city}, {wedding.venue.name}
      </p>
      <Button asChild className="mt-8">
        <Link to="/invitation">Открыть приглашение</Link>
      </Button>
    </div>
  );
}
