import { intlFormatDistance } from "date-fns";

export function relativeTime(str: string) {
  const diff = new Date().getTime() - new Date(str).getTime();
  const raw = intlFormatDistance(str, new Date())
    .replace("now", "just now")
    .replace(/-?\d+\sseconds?/, "just now")
    .replace("ago", "");
  if (diff > 60000) {
    return `${raw} ago`;
  }
  return raw;
}
