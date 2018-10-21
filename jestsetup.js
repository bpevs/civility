require("raf/polyfill") // raf polyfill only for testing in dom
const Enzyme = require("enzyme")
const Adapter = require("enzyme-adapter-react-16")

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
