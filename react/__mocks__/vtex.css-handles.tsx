export const useCssHandles = (
  cssHandles: string[],
  _?: Record<string, any>
) => {
  const handles: any = {}
  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  const withModifiers = (baseHandle: string, __: any) => baseHandle

  return { handles, withModifiers }
}
