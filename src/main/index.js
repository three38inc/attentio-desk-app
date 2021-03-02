import { app, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import store from  '../renderer/store'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, tray
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`



const createTray = () => {
  // Create a new tray
  tray = new Tray(path.join(__static, '/logo.png'))
    
  tray.setToolTip('Attentio App')

  tray.on('double-click', () => {
    toggleWindow()
  })

  tray.on('click', () => {
    toggleWindow()
  })

  tray.on('right-click', () => {
    toggleWindow()
  })
}

function createWindow () {

  mainWindow = new BrowserWindow({
    height: 445,
    useContentSize: true,
    width: 350,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    skipTaskbar: true,  // for avoiding icon in windows taskbar
    webPreferences: {
      nodeIntegration: true 
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.setVisibleOnAllWorkspaces(true)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('app-version', app.getVersion())
  })
  
  mainWindow.once('ready-to-show', () => {
    showWindow()
  })
  // Hide the window when it loses focus
  mainWindow.on('blur', () => {
    mainWindow.hide()
  })

}

app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    showWindow()
  }
})

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} 
else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      showWindow()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
    createTray()
    createWindow()
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  if(app.dock){
    // hide the dock icon
    app.dock.hide()
  }
  
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
    toggleWindow()
  })
  
  app.on('browser-window-created',function(event, window) {
    window.setMenu(null);
  });

  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe')
  })
  
  //Receive and reply to synchronous message
  ipcMain.on('quit-app', (event, args) => {
    app.quit()
  });
}

// getWindowPosition
const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  let x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  let y = 0
  if (process.platform !== 'win32') {
    // not windows
    // Position window 4 pixels vertically below the tray icon
    y = Math.round(trayBounds.y + trayBounds.height)
  }else{
    // windows
    // Position window 4 pixels vertically above the tray icon
    y = Math.round(trayBounds.y - trayBounds.height - windowBounds.height)
  }
  return { x: x, y: y }
}

// toggle mainWindow
const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

// show the mainWindow
const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
