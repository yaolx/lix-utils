import { forEach, filter, isArray, find, defaults, curryRight, isObject } from 'lodash'

type RootSniffer = (treeItem: TreeItem, parentKey: string, treeItems?: TreeItems) => boolean

export interface Options {
  childrenKey: string,
  parentKey: string,
  itemIdentifier: string,
  subIdentifier?: string,
  rootSniffer?: RootSniffer
}

export interface TreeItem {
  [key: string]: string | TreeItem[]
}

export interface TreeItems {
  [key: string]: TreeItem
}

function toTree(dataArray: TreeItem[], options: Options): TreeItem[] {
  let treeItems: TreeItems = {}
  let {childrenKey, parentKey, itemIdentifier, subIdentifier} = options
  let genSubId: (item: TreeItem) => string = (item) => subIdentifier ? item[subIdentifier] as string : ''
  let gen = (key: string) => (item: TreeItem) => item[key] + genSubId(item)
  let genKey: (item: TreeItem) => string = gen(itemIdentifier)

  forEach(dataArray, (item: TreeItem) => {
    treeItems[genKey(item)] = item
  })

  forEach(treeItems, (treeItem: TreeItem) => {
    let matchObject = {[itemIdentifier]: treeItem[parentKey]}

    if (subIdentifier) {
      matchObject[subIdentifier] = treeItem[subIdentifier]
    }

    let p = find(dataArray, matchObject)
    if (p) {
      if (!p[childrenKey]) {
        p[childrenKey] = []
      }
      const childrenArray = p[childrenKey] as TreeItem[]
      if (childrenArray.indexOf(treeItem) === -1) {
        childrenArray.push(treeItem)
      }
    }
  })

  return findRoot(treeItems, options)
}

function findRoot(treeItems: TreeItems, options: Options) {
  let parentKey = options.parentKey
  return filter(treeItems, (treeItem) => {
    if (options.rootSniffer) {
      return Boolean(options.rootSniffer(treeItem, parentKey, treeItems))
    } else {
      return false
    }
  })
}

function pushChildren(treeNode: TreeItem, childrenKey: string, collection: TreeItem[] = []): TreeItem[] {
  let children = treeNode[childrenKey]
  let reCollection = [...collection]
  reCollection.push(treeNode)

  if (isArray(children) && children.length > 0) {
    reCollection = reCollection.concat(flattenTree(children, childrenKey))
  }

  return reCollection
}

function flattenTree(treeData: TreeItem[], childrenKey: string): TreeItem[] {
  let reTreeData = treeData || []
  return reTreeData.map((node) => pushChildren(node, childrenKey)).reduce((pre, cur) => pre.concat(cur), [])
}

function flattenTreeWithoutChildren(treeData: TreeItem[], childrenKey: string): TreeItem[] {
  let reTreeData = treeData || []
  return reTreeData.map((node) => pushChildren(node, childrenKey)).reduce((pre, cur) => pre.concat(cur), []).map((node) => {
    delete node[childrenKey]
    return node
  })
}

/**
 * 递归执行调用方法
 */
function recursionChildren(collection: TreeItem[], key: string, method: (item: TreeItem) => void) {
  let reCollection = collection
  if (isObject(collection) && !isArray(collection)) {
    reCollection = [collection]
  }

  forEach(reCollection, (item) => {
    const children = item[key] as TreeItem[]
    method(item)
    recursionChildren(children, key, method)
  })
}

function treeable(options: Options) {
  defaults(options, {
    childrenKey: 'children',
    parentKey: 'parent',
    itemIdentifier: 'identifier',
    // 副标识
    subIdentifier: '',
    rootSniffer(treeItem: TreeItem, parentKey: string, treeItems: TreeItems): boolean {
      return !treeItem[parentKey] || treeItem[parentKey] === 'ROOT'
    }
  })

  /*
   生成树形方法
   */
  const treeable: any = curryRight(toTree)(options)
  /*
   注册扁平方法
   */
  treeable.flatten = curryRight(flattenTree)(options.childrenKey)
  /*
   注册扁平方法, 与 `flatten` 不同, 这个方法扁平后会删除掉childrenKey
   */
  treeable.flattenWithoutChildren = curryRight(flattenTreeWithoutChildren)(options.childrenKey)

  treeable.recursionChildren = recursionChildren

  return treeable
}

// TODO: 补充treeable的单元测试

export { treeable }
