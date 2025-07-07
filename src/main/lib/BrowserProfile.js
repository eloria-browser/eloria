import { WebContentsView } from 'electron'
import { is } from '@electron-toolkit/utils'
import path from 'path'

const CONTROLS_HEIGHT = 126

export default class BrowserProfile {
  constructor(partition) {
    this.partition = partition
    this.controlsView = new WebContentsView({
      webPreferences: {
        partition
      }
    })

    this.mainView = new WebContentsView({
      webPreferences: {
        webviewTag: true,
        partition
      }
    })
  }

  resize({ x, y, width, height }) {
    this.controlsView.setBounds({
      x,
      y,
      width,
      height: CONTROLS_HEIGHT
    })

    this.mainView.setBounds({
      x,
      y: y + CONTROLS_HEIGHT,
      width,
      height: height - CONTROLS_HEIGHT
    })
  }

  initialize() {
    this.baseWindow.contentView.addChildView(this.controlsView)
    this.baseWindow.contentView.addChildView(this.mainView)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.controlsView.webContents.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.controlsView.webContents.loadFile(path.join(__dirname, '../renderer/index.html'))
    }

    this.controlsView.webContents.openDevTools({ mode: 'detach' })

    this.mainView.webContents.loadURL('https://www.google.com')
  }

  /** @param {import("electron").BaseWindow} baseWindow */
  setBaseWindow(baseWindow) {
    this.baseWindow = baseWindow
  }
}
