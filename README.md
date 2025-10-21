# Tauri + React + Typescript

just customised an template, and help you get started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## initial

```bash

$ npm i --force

```


## start


```bash

$ npm run tauri dev

```


## deployment

according to different version of the package, here are the mainly what we used for current project

and in default we can build and package current project with the commend here below:

```bash

# just only default, it will help build all kind of the versions (not recomend)
$ npm run tauri build

```

so it's better we can help built it according to our need for diffrent plamtform

```bash

# can according to different OS version to help build it by changing the parameters of the target here below (recomend)

# windows
$ npm run tauri build -- --target x86_64-pc-windows-msvc

# x86_64-pc-windows-msvc（64位）
# i686-pc-windows-msvc（32位）
# aarch64-pc-windows-msvc（ARM64，需要安装特定的 Visual Studio 构建工具）

# MacOS
$ npm run tauri build -- --target x86_64-apple-darwin

# x86_64-apple-darwin
# aarch64-apple-darwin（Apple Silicon）

# linux
$ npm run tauri build -- --target x86_64-unknown-linux-gnu

# x86_64-unknown-linux-gnu
# i686-unknown-linux-gnu
# aarch64-unknown-linux-gnu 


```
and finally , you can find the packages in the path of the `src-tauri/target/release/bundle`.


> - `src-tauri/target/release/bundle/msi/****.msi `    --> Msi install application
> - `src-tauri/target/release/bundle/nsis/****.exe`    --> exe install application


## additional issue

during the building, you may find the download issue here below:

for example , the package of the `WixTools` lacked
for current package , mainly lacked the packed of the `WixTools314`:
and then download the pacakge according to the commend alert and place it in the path : `C:\Users\${User}\AppData\Local\tarui\WixTools314`

and for the left download issue and resolution:
https://github.com/tauri-apps/tauri/issues/7338