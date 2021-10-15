export class Setting {
  name = 'root'
  theme = 'rjv-default'
  collapseStringsAfterLength = 5
  shouldCollapse = false
  quotesOnKeys = true
  groupArraysAfterLength = 100
  indentWidth = 2
  enableClipboard: Boolean | Function = true
  displayObjectSize = true
  displayDataTypes = false
  iconStyle = 'triangle'
  defaultValue = null
  displayArrayKey = true
  collapsed: Boolean | Number = false
  sortKeys = true

  update(props) {
    Object.assign(this, props)
  }
}
