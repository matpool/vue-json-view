import { Store } from 'vore'
import { Setting } from './Setting'

export const store = new Store({
  setting: new Setting(),
})
