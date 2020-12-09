export const useCssHandles = (
  cssHandles: string[],
  options?: Record<string, any>
) => {
  const handles: any = {}
  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  return { handles }
}
