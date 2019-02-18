import { configure } from "@storybook/react"
import "@civility/stylesheets/dist/civility.css"

function loadStories() {
  require("../stories/Background.js")
  require("../stories/Button.js")
  require("../stories/Col.js")
  require("../stories/DateTime.js")
  require("../stories/Input.js")
  require("../stories/Nav.js")
  require("../stories/NoJS.js")
  require("../stories/Only.js")
  require("../stories/OnlyJS.js")
  require("../stories/Row.js")
  require("../stories/SigninForm.js")
  require("../stories/Tag.js")
}

configure(loadStories, module)
