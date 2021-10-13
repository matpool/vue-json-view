import { toType } from '../helpers/util'

//store persistent display attributes for objects and arrays
class ObjectAttributes {
  objects = {}

  set = (vjvId, name, key, value) => {
    if (this.objects[vjvId] === undefined) {
      this.objects[vjvId] = {}
    }
    if (this.objects[vjvId][name] === undefined) {
      this.objects[vjvId][name] = {}
    }
    this.objects[vjvId][name][key] = value
  }

  get = (vjvId, name, key, default_value) => {
    if (
      this.objects[vjvId] === undefined ||
      this.objects[vjvId][name] === undefined ||
      this.objects[vjvId][name][key] == undefined
    ) {
      return default_value
    }
    return this.objects[vjvId][name][key]
  }
}

export default new ObjectAttributes()
