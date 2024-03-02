import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

const blacklist = ["WebCord"];

export default class FocusMyWindow extends Extension {
  enable() {
    this._handlerid = global.display.connect(
      "window-demands-attention",
      function (display, window) {
        for (const item of blacklist) {
          if (window.title.toLowerCase().includes(item.toLowerCase())) return;
        }

        Main.activateWindow(window);
      }
    );
  }

  disable() {
    global.display.disconnect(this._handlerid);
    this._handlerid = null;
  }
}
