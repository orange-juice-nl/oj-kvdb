import * as fs from "fs"
import * as path from "path"

const readJSON = (location: string) =>
  JSON.parse(fs.readFileSync(location, { encoding: "utf-8" }))

const writeJSON = (location: string, json: any) =>
  fs.writeFileSync(location, JSON.stringify(json), { encoding: "utf-8" })

export class KeyValueDB<T> {
  data: { [k: string]: T } = {}
  location?: string
  syncTimer?: any
  threshold?: number

  constructor(location?: string, syncThreshold: number = 200) {
    if (!location)
      return

    this.location = location
    this.threshold = syncThreshold

    try {
      fs.mkdirSync(path.dirname(this.location), { recursive: true })
      if (!fs.existsSync(this.location))
        writeJSON(this.location, {})
      else
        this.data = readJSON(this.location)
    } catch (err) {
      console.error(err)
    }
  }

  set(key: string, value: T) {
    this.data[key] = value
    this.sync()
    return key
  }

  get(key: string) {
    return this.data[key]
  }

  has(key: string) {
    return key in this.data
  }

  getAll() {
    return Object.entries(this.data)
  }

  private sync() {
    if (!this.location)
      return

    if (this.threshold > 0) {
      clearTimeout(this.syncTimer)
      this.syncTimer = setTimeout(() => { try { writeJSON(this.location, this.data) } catch (err) { console.error(err) } }, this.threshold)
    }
    else
      writeJSON(this.location, this.data)
  }
}