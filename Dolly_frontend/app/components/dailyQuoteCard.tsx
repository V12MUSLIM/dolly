import { getDailyQuote } from "@/utils/getDailyQuote";
import { Card } from "@heroui/react";
import { Quote } from "lucide-react";

export default function DailyQuoteCard() {
  const quote = getDailyQuote();

  return (
    <Card variant="secondary">
      <Card.Header>
        <Card.Title className="text-2xl">
          Today&apos;s Focus
        </Card.Title>
      </Card.Header>
      <div className="flex flex-col gap-2">
        <Quote className="rotate-180 fill-accent" />
        <blockquote>{quote.quoteText}</blockquote>
        <Quote className="self-end fill-accent" />
      </div>
      <p className="mt-4 text-right text-sm font-semibold text-gray-600 opacity-80">
        — {quote.quoteAuthor || "Unknown"}
      </p>
    </Card>
  );
}
