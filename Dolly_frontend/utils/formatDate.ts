export default function formatDate(
  createdAt: string | Date,
  style: "full" | "long" | "medium" | "short" | undefined,
) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    dateStyle: style,
  });
}
