const { app, BrowserWindow, Menu, Tray, Notification } = require('electron');
let win = null;
let tray = null
Menu.setApplicationMenu(null);
let close = false

function createWindow() {
    tray = new Tray(__dirname + '/dida.png')
    win = new BrowserWindow();
    // win.webContents.openDevTools();
    var trayMenuTemplate = [
        {
            label: '显示/隐藏',
            click: function () {
                win.isVisible() ? win.hide() : win.show();
                win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
            }
        },
        {
            label: '退出',
            click: function () {
                close = true;
                app.quit();
            }
        }
    ];
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setContextMenu(contextMenu);
    win.on('close', (event) => {
        if (!close) {
            event.preventDefault();
            win.hide();
            win.setSkipTaskbar(true);
        }
    })
    win.loadURL('https://dida365.com/signin');
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })
}

app.on('ready', createWindow)