import { useRuntime, useTreePath } from 'vtex.render-runtime'

/** This is a throwaway function, while useChildBlock doesn't return
 * the "implements" block info, or which specialization of the block
 * is being used (i.e. whether its `submenu` or `submenu.accordion`)
 */
const useSubmenuExtension = () => {
  const runtime = useRuntime()
  const treePathContext = useTreePath()

  const { treePath } = treePathContext
  const { extensions } = runtime

  if (!extensions || !treePath) {
    return {}
  }

  const submenuTreePath = `${treePath}/submenu`

  const extension = extensions[submenuTreePath]

  return extension || {}
}

export default useSubmenuExtension
