import { Button } from "@wedding/ui";

type RsvpButtonProps = {
  className?: string;
};

export function RsvpButton({ className }: RsvpButtonProps) {
  return (
    <Button variant="outline" className={className}>
      RSVP
    </Button>
  );
}
