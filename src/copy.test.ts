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
// emptyDir
// file3.txt

const dir1 = path.join(workdir, "dir1");
const file1 = path.join(dir1, "file1.txt");
const dir2 = path.join(dir1, "dir2");
const file2 = path.join(dir2, "file2.txt");
const empty = path.join(dir1, "emptyDir");
const file3 = path.join(workdir, "file3.txt");

beforeAll(async () => {
  await remove(workdir);
  fs.mkdirSync(workdir);
  fs.mkdirSync(dir1);
  fs.mkdirSync(dir2);
  fs.mkdirSync(empty);
  fs.writeFileSync(file1, "file1");
  fs.writeFileSync(file2, "file2");
  fs.writeFileSync(file3, "file3");
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
it("copy dd", async () => {
  const dirs = await readIncludes(workdir);
  const target = path.join(workdir, "dd");
  await copy(workdir, target);
  expect(
    (await readIncludes(target)).sort().map((each) => each.replace(target, ""))
  ).toEqual(dirs.sort().map((each) => each.replace(workdir, "")));
});
// it("copy df", async () => {});
// it("copy dn", async () => {});
// it("copy dd inner", async () => {});
