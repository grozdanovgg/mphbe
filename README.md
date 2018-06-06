using https://github.com/Onix-Systems/node-typescript-mongodb

to start:
tsc
npm start

to debug:
launch.json:
 {
    "type": "node",
    "request": "launch",
    "name": "Start and Debug",
    "preLaunchTask": "tsc watch",
    "timeout": 10000,
    "program": "${workspaceFolder}\\src\\index.ts",
    "restart": true,
    "cwd": "${workspaceRoot}",
    "outFiles": [
        "${workspaceFolder}/build/**/*.js"
    ],
    "sourceMaps": true
}
tasks.jsons:
"version": "2.0.0",
    "tasks": [
        {
            "label": "tsc watch",
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "option": "watch",
            "options": {
                "shell": {
                    "executable": "powershell.exe"
                }
            },
            "problemMatcher": [
                "$tsc-watch"
            ],
            "group": "build"
        }
    ]