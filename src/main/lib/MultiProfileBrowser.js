import { BaseWindow, screen } from 'electron'
import BrowserProfile from './BrowserProfile'

const SIDE_MENU_WIDTH = 56
const PAGE_MENU_WIDTH = 64

export default class MultiProfileBrowser {
  constructor() {
    const workArea = screen.getPrimaryDisplay().workArea
    this.baseWindow = new BaseWindow({
      ...workArea,
      autoHideMenuBar: true
      //   frame: false
    })
    this.profiles = []
    this.initProfiles()
    this.baseWindow.on('resize', this.resizeProfiles.bind(this))
  }

  initProfiles() {
    const profile = new BrowserProfile()

    profile.setBaseWindow(this.baseWindow)
    profile.initialize()

    this.profiles.push(profile)
    this.resizeProfiles()
  }

  resizeProfiles() {
    const bounds = this.baseWindow.getBounds()
    const startX = SIDE_MENU_WIDTH
    const availableWidth = bounds.width - (SIDE_MENU_WIDTH + PAGE_MENU_WIDTH)

    for (const profile of this.profiles) {
      profile.resize({
        x: startX,
        y: 0,
        width: availableWidth,
        height: bounds.height
      })
    }
  }
}
