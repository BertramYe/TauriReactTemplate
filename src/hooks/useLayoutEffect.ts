import React from 'react'

const useLayoutEffect = (effect: () => void, deps: ReadonlyArray<any>) => {
  const disable = React.useRef(true)

  React.useLayoutEffect(() => {
    if (disable.current) {
      disable.current = false

      return
    }
    return effect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useLayoutEffect
