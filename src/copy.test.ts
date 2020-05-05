import remove from "./remove";
import copy from "./copy";
import fs from "fs";
import path from "path";
import readIncludes from "./read_include";

const workdir = path.join(
  process.cwd(),
  Array.from({ length: 5 }, () => {
    return String.fromCharCode(
      "a".charCodeAt(0) + Math.floor(Math.random() * 26)
    );
  }).join("")
);

// dir1
//    file1.txt
//    dir2
//      file2.txt
//    dir4
//      file4.txt
//    dir5
//      file5.txt
//    dir6
//      file6.txt
// emptyDir
// file3.txt

const dir1 = path.join(workdir, "dir1");
const file1 = path.join(dir1, "file1.txt");
const dir2 = path.join(dir1, "dir2");
const dir4 = path.join(dir1, "dir4");
const dir5 = path.join(dir1, "dir5");
const dir6 = path.join(dir1, "dir6");
const file2 = path.join(dir2, "file2.txt");
const file4 = path.join(dir4, "file4.txt");
const file5 = path.join(dir5, "file5.txt");
const file6 = path.join(dir6, "file6.txt");
const empty = path.join(dir1, "emptyDir");
const file3 = path.join(workdir, "file3.txt");

beforeAll(async () => {
  await remove(workdir);
  fs.mkdirSync(workdir);
  fs.mkdirSync(dir1);
  fs.mkdirSync(dir2);
  fs.mkdirSync(dir4);
  fs.mkdirSync(dir5);
  fs.mkdirSync(dir6);
  fs.mkdirSync(empty);
  fs.writeFileSync(file1, "file1");
  fs.writeFileSync(file2, "file2");
  fs.writeFileSync(file3, "file3");
  fs.writeFileSync(file4, "file4");
  fs.writeFileSync(file5, "file5");
  fs.writeFileSync(file6, "file6");
});
afterAll(async () => {
  await remove(workdir);
});
it("copy ff", async () => {
  const target = path.join(workdir, "overwrite.txt");
  fs.writeFileSync(target, "overwrite");
  await copy(file1, target);
  expect(fs.readFileSync(target, "utf-8")).toBe("overwrite");
  await copy(file1, target, { overwrite: true });
  expect(fs.readFileSync(target, "utf-8")).toBe("file1");
});
it("copy fd", async () => {
  await copy(file1, dir2);
  expect(fs.readFileSync(path.join(dir2, "file1.txt"), "utf-8")).toBe("file1");
});
it("copy fn", async () => {
  const target = path.join(workdir, "no", "no.txt");
  await copy(file1, target);
  expect(fs.readFileSync(target, "utf-8")).toBe("file1");
});
it("copy dd not exist", async () => {
  const dirs = await readIncludes(workdir);
  const target = path.join(workdir, "dd");
  await copy(workdir, target);
  expect(
    (await readIncludes(target)).sort().map((each) => each.replace(target, ""))
  ).toEqual(dirs.sort().map((each) => each.replace(workdir, "")));
});
it("copy dd exist", async () => {
  const dir4list = await readIncludes(dir4);
  await copy(dir4, dir5);
  const base = path.join(dir5, "dir4");
  const dirs = await readIncludes(base);
  expect(dir4list.map((each) => each.replace(dir4, "")).sort()).toEqual(
    dirs.map((each) => each.replace(base, "")).sort()
  );
});
it("copy dd inner", async () => {
  const dir6list = await readIncludes(dir6);
  await copy(dir4, dir6, { inner: true });
  const extra = await readIncludes(dir6);
  expect(dir6list.concat(path.join(dir6, "file4.txt")).sort()).toEqual(
    extra.sort()
  );
});
