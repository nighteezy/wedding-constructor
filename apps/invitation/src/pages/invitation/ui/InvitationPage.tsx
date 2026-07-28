import { RsvpButton } from "@/features/rsvp";

export function InvitationPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-rose-50">
      <div className="text-center p-8">
        <h2 className="text-3xl font-serif text-rose-800">
          Электронное приглашение
        </h2>
        <p className="mt-4 text-rose-600">
          Микрофронт invitation — FSD структура
        </p>
        <RsvpButton className="mt-6" />
      </div>
    </div>
  );
}
