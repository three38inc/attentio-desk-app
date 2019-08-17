import { app, BrowserWindow, Tray, Menu } from 'electron'
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
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


const createTray = () => {
  // Create a new tray
  tray = new Tray(path.join(__static, '/logo.png'))
    
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show / Hide',
      click: () => toggleWindow
    },
    { 
      label: 'Quit', 
      accelerator: 'Command+Q',
      selector: 'terminate:'
    }
  ])
  tray.setToolTip('Attentio App')
  // tray.setContextMenu(contextMenu)

  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', toggleWindow)
}

function createWindow () {

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 450,
    useContentSize: true,
    width: 350,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true 
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.setVisibleOnAllWorkspaces(true)

  mainWindow.once('ready-to-show', () => {
    const position = getWindowPosition()
    mainWindow.setPosition(position.x, position.y, false)
    mainWindow.show()
    mainWindow.focus()
  })

  // Hide the window when it loses focus
  mainWindow.on('blur', () => {
    mainWindow.hide()
  })

}

// hide the dock icon
app.dock.hide()

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  toggleWindow()
})

app.on('browser-window-created',function(event, window) {
  window.setMenu(null);
});

// getWindowPosition
const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

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
