import React from 'react'

const useEffect = (effect: () => void, deps: ReadonlyArray<any>) => {
  const disable = React.useRef(true)

  React.useEffect(() => {
    if (disable.current) {
      disable.current = false

      return
    }

    return effect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useEffect
