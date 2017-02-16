'use strict';

const electron = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', closeAllWindows);
app.on('activate', activateApp);

// Initialize main window.
function createWindow () {
  
    mainWindow = new BrowserWindow({darkTheme: true});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.maximize();

    mainWindow.on('closed', closeWindow);

    function closeWindow () {
        mainWindow = null;
    }

}

// Close app on window close.
function closeAllWindows () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

function activateApp () {
    if (mainWindow === null) {
        createWindow();
    }
}