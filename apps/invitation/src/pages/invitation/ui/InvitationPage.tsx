import { RsvpButton } from "@/features/rsvp";
import { ProgramTimeline } from "@/widgets/program-timeline";
import { Button } from "@wedding/ui";
import { useWedding } from "@wedding/api-client";

export function InvitationPage() {
  const { data: wedding, isLoading, isError, error } = useWedding();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-rose-50 py-12 px-4">
        <p className="text-rose-700">Загрузка...</p>
      </div>
    );
  }

  if (isError || !wedding) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-rose-50 py-12 px-4 text-center">
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
    <div className="min-h-[60vh] flex items-center justify-center bg-rose-50 py-12 px-4">
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-serif text-rose-800">
          {wedding.couple.displayName}
        </h2>
        <p className="mt-2 text-rose-700">{wedding.date.display}</p>
        <p className="mt-1 text-rose-600">
          {wedding.venue.city}, {wedding.venue.name}
        </p>

        <div className="mt-8 text-rose-800">
          <p className="font-medium">{wedding.invitation.greeting}</p>
          <p className="mt-4 text-rose-700 leading-relaxed">
            {wedding.invitation.message}
          </p>
        </div>

        <ProgramTimeline items={wedding.program} />

        <RsvpButton className="mt-10" />
      </div>
    </div>
  );
}
