import path from "path";
import ensureMkdir from "./ensure_mkdir";
import pipe from "./pipe";
import { Filter, getFileStat } from "./helper";
import { readdir } from "./promise_fs";

interface Options extends Filter {
  overwrite?: boolean;
  inner?: boolean;
}
export default async function copy(
  src: string,
  dest: string,
  options: Options = {}
): Promise<any> {
  options = {
    overwrite: false,
    inner: false,
    ...options,
  };
  const srcType = await getFileStat(src);
  if (srcType === "n") {
    return;
  }
  if (options.filter && (await options.filter(src, srcType)) === false) {
    return;
  }
  const destType = await getFileStat(dest);
  switch (srcType + destType) {
    case "fd":
    case "ff":
    case "fn": {
      if (destType === "d") {
        dest = path.join(dest, path.basename(src));
      }
      if (options.overwrite === false && destType === "f") {
        return;
      }
      return pipe(src, dest);
    }
    case "df":
      return;
    case "dn":
    case "dd": {
      const child = await readdir(src);
      if (destType === "d" && !options.inner) {
        return copy(src, path.join(dest, path.basename(src)), options);
      }
      if (destType === "n") {
        await ensureMkdir(dest);
      }
      const isInner = options.inner;
      delete options.inner;
      return Promise.all(
        child.map((target) =>
          copy(
            path.join(src, target),
            isInner ? dest : path.join(dest, target),
            options
          )
        )
      );
    }
    default:
      throw new Error("参数错误");
  }
}
