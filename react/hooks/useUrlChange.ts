import { useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import type { Listener } from 'history'

export const useUrlChange = (fn: Listener, deps: unknown[]) => {
  const { history } = useRuntime()

  useEffect(() => {
    // cancel method is returned to be executed whenever our deps change
    return history?.listen(fn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, history, ...deps])
}
