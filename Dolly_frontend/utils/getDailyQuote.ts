import quotesData from "@/app/quotes.json";
const shortQoutes = quotesData.filter(
  (o) => o.quoteText.split(" ").length <= 12,
);
// JamesFT's JSON structure uses these exact keys
export type Quote = {
  quoteText: string;
  quoteAuthor: string;
};

export function getDailyQuote(): Quote {
  const now = new Date();

  // Create a unique integer for today (e.g., August 10, 2026 becomes 20260810)
  // This ensures the quote changes at exactly midnight local time.
  const dateSeed =
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  // Use the modulo operator to ensure the index loops back around
  // if dateSeed exceeds the 5000+ length of the array
  const index = dateSeed % shortQoutes.length;

  return shortQoutes[index];
}
