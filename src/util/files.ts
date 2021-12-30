import { existsSync, readFile } from 'fs'
import db from 'quick.db'

const files = new db.table('files')

export function setFilePath(name: string, path: string) {
  files.set(`${name}.path`, path)
}

export function deleteFile(name: string) {
  files.delete(name)
}

export function setFileOwner(name: string, ownerId: string) {
  files.set(`${name}.owner`, ownerId)
}

export function getFilePath(name: string): string | undefined {
  return files.get(`${name}.path`)
}

export function getFileOwner(name: string): string | undefined {
  return files.get(`${name}.owner`)
}

interface FileData {
  path: string
  owner: string
}

export function getFileData(name: string): FileData | undefined {
  return files.get(name)
}

export function fileExist(name: string) {
  let res = files.get(name)

  return res ? true : false
}

export function getFileImagePath(path: string) {
  if (existsSync(`${path}.png`)) {
    return `${path}.png`
  }
  if (existsSync(`${path}.jpg`)) {
    return `${path}.jpg`
  }
  if (existsSync(`${path}.jpeg`)) {
    return `${path}.jpeg`
  }
  if (existsSync(`${path}.webp`)) {
    return `${path}.webp`
  }
}
