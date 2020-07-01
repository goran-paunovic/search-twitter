import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

export function getTimeFromNow(datetime) {
  if (datetime === "") return null;

  const parts = datetime.split(" ");
  const datetimeString =
    parts[1] + " " + parts[2] + " " + parts[5] + " " + parts[3];

  const d = dayjs(datetimeString, "MMM DD YYYY HH:mm:ss");

  dayjs.extend(relativeTime);
  return d.fromNow();
}
