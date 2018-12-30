const path = require('path')
const url = require('url')
const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

// keep reference to window object, o/w window will close when object is garbage collected
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    show: false,
    title: 'lichess.org',
    darkTheme: true,
    icon: __dirname + '/icon.svg',
    webSecurity: false
   })

  mainWindow.maximize()
  //mainWindow.setFullScreen(true)

  mainWindow.loadURL('https://lichess.org/')
  mainWindow.once('ready-to-show', () => { mainWindow.show() })

  // devtools
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () { mainWindow = null })
}

// after electron initialized, create window
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
