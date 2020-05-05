import path from "path";
import { readdirSync, unlinkSync, rmdirSync } from "graceful-fs";
import { Filter, getFileStatSync } from "./helper";

export default function removeSync(
  target: string,
  filter?: Filter["filter"]
): void {
  const type = getFileStatSync(target);
  if (type === "n") {
    return;
  }
  if (filter && filter(target, type) === false) {
    return;
  }
  if (type === "f") {
    return unlinkSync(target);
  }
  readdirSync(target).map((each) => removeSync(path.join(target, each)));
  rmdirSync(target);
}
removeSync("F:\\better-fs\\mabqn");
