import remove from "./remove";
import readIncludes from "./read_include";
import fs from "fs";
import path from "path";

const workdir = path.join(
  process.cwd(),
  Array.from({ length: 5 }, () => {
    return String.fromCharCode(
      "a".charCodeAt(0) + Math.floor(Math.random() * 26)
    );
  }).join("")
);
beforeAll(async () => {
  await remove(workdir);
  fs.mkdirSync(workdir);
});
afterAll(async () => {
  await remove(workdir);
});
// empty
// has
//   hasFile.txt
//   hasSubDir
//   hasSubFile.text
// something.txt
it("readIncludes", async () => {
  const emptyDir = path.join(workdir, "empty");
  const hasDir = path.join(workdir, "has");
  const rootFile = path.join(workdir, "something.txt");
  const hasFile = path.join(hasDir, "hasFile.txt");
  const hasSubDir = path.join(hasDir, "hasSubDir");
  const hasSubFile = path.join(hasDir, "hasSubFile.text");
  fs.mkdirSync(emptyDir);
  fs.mkdirSync(hasDir);
  fs.writeFileSync(rootFile, "rootFile");
  fs.writeFileSync(hasFile, "hasFile");
  fs.mkdirSync(hasSubDir);
  fs.writeFileSync(hasSubFile, "hasSubFile");
  const filter = (_dir: any, type: any) => type === "f";
  const dirs = await readIncludes(workdir, filter);
  expect(dirs.sort()).toEqual([rootFile, hasFile, hasSubFile].sort());
  expect((await readIncludes(workdir)).sort()).toEqual(
    [rootFile, hasFile, hasSubFile, emptyDir, hasDir, hasSubDir, workdir].sort()
  );
});
