const electron = require('electron')
const app = electron.app
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow

const WIN_WIDTH = 1024;
const WIN_HEIGHT = 768;
let mainWindow

function createWindow() {
    // Create the browser window.
    let screen = electron.screen.getPrimaryDisplay();
    mainWindow = new BrowserWindow({
        title: 'Poke Location - Pokezz.com',
        width: (screen.bounds.width < WIN_WIDTH ? Math.floor(screen.bounds.width * .75) : WIN_WIDTH),
        height: (screen.bounds.width < WIN_HEIGHT ? Math.floor(screen.bounds.width * .75) : WIN_HEIGHT),
        webPreferences: {
            nodeIntegration: false
        }
    })

    mainWindow.loadURL(`https://pokezz.com/`)

    mainWindow.webContents.on('new-window', function(event, url) {
      if (url.indexOf('http') != 0) {
        event.preventDefault();
        if(!shell.openExternal(url)) {
          mainWindow.webContents.executeJavaScript("Materialize.toast('PokeSniper2 Not Found!', 3000)");
        }
      }
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
