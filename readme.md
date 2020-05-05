# 特点

1. 基于`graceful-fs`,更可靠
2. 提供全部`fs`native 方法,部分原生回调方式改为 promise
3. 提供 `copy,remove,move` 等实用方法的异步和同步调用
4. 全部用 `typescript` 开发,可靠性高,`vscode`智能提示支持
5. 全部 api 有 `jest` 单元测试,测试覆盖率如下图

![](https://raw.githubusercontent.com/zcs19871221/better-fs/master/cover.png)

# 使用

typescript

    import * as fs from 'better-fs'
    fs.copy()
    fs.remove()
    ......

node

    const fs = require('better-fs');
    fs.copy()
    fs.remove()
    ......

# api

全部 fs 默认 api,改变下面原生方法返回值为 promise

    lstat,
    readdir,
    rename,
    unlink,
    writeFile,
    readFile,

开发下面方法,返回值 promise.`方法名+Sync` 可调用同步方法

## copy

复制目录,文件到目标地址

## ensureWriteFile

写文件,如果目标文件目录不存在,会自动创建目录

## isExist

文件是否存在

## ensureMkdir

类似 mkdir -p

## move

移动目录,文件到指定地点或重命名

## pipe

输入 src 和 dest 文件地址,执行 stream pipe,返回 promsie

## readInclude

读取目标目录下的所有目录,文件

## remove

移除目标目录,文件夹
