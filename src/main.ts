import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './nodelib/Dev';

if (isDev()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('electron-reload')(__dirname, {
        electron: path.join(
            __dirname,
            '..',
            'node_modules',
            '.bin',
            'electron',
        ),
        forceHardReset: true,
        hardResetMethod: 'exit',
    });
}

const createWindow = (): void => {
    const window = new BrowserWindow({
        width: 1200,
        height: 600,
        icon: path.join(__dirname, 'icons/512x512.png'),
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: true,
            preload: path.join(__dirname, './preload.js'),
        },
    });

    window.loadFile(path.join(__dirname, './index.html'));
    if (isDev()) window.webContents.openDevTools();
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.on('ready', () => {
    createWindow();
});

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
    // macOS 以外では、メインプロセスを停止する
    // macOS では、ウインドウが閉じてもメインプロセスは停止せず
    // ドックから再度ウインドウが表示されるようにする。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // macOS では、ウインドウが閉じてもメインプロセスは停止せず
    // ドックから再度ウインドウが表示されるようにする。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
