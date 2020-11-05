import { useCallback, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import type { Listener } from 'history'

export const useUrlChange = (fn: Listener, deps: unknown[]) => {
  const { history } = useRuntime()

  const memoizedCallback = useCallback(fn, deps)

  useEffect(() => {
    // cancel method is returned to be executed whenever our deps change
    return history?.listen(memoizedCallback)
  }, [memoizedCallback, history])
}
