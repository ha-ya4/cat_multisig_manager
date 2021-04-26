"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const createWindow = () => {
    const window = new electron_1.BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: true,
        },
    });
    // 読み込む index.html。
    // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
    window.loadFile('./index.html');
    // 開発者ツールを起動する
    window.webContents.openDevTools();
};
// Electronの起動準備が終わったら、ウィンドウを作成する。
electron_1.app.whenReady().then(createWindow);
// すべての ウィンドウ が閉じたときの処理
electron_1.app.on('window-all-closed', () => {
    // macOS 以外では、メインプロセスを停止する
    // macOS では、ウインドウが閉じてもメインプロセスは停止せず
    // ドックから再度ウインドウが表示されるようにする。
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // macOS では、ウインドウが閉じてもメインプロセスは停止せず
    // ドックから再度ウインドウが表示されるようにする。
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map