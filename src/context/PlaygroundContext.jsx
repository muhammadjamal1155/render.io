import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'

export const initialState = {
  memoEnabled: false,
  useMemoEnabled: false,
  useCallbackEnabled: false,
  controlValue: '',
  sliderValue: 50,
  activePanel: 'memo',
  activeView: 'playground',
  forceTick: 0,
  resetVersion: 0,
}

export function playgroundReducer(state, action) {
  switch (action.type) {
    case 'SET_MEMO_ENABLED':
      return { ...state, memoEnabled: action.payload }
    case 'SET_USE_MEMO_ENABLED':
      return { ...state, useMemoEnabled: action.payload }
    case 'SET_USE_CALLBACK_ENABLED':
      return { ...state, useCallbackEnabled: action.payload }
    case 'SET_CONTROL_VALUE':
      return { ...state, controlValue: action.payload }
    case 'SET_SLIDER_VALUE':
      return { ...state, sliderValue: action.payload }
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.payload }
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload }
    case 'FORCE_RENDER':
      return { ...state, forceTick: state.forceTick + 1 }
    case 'RESET_PLAYGROUND':
      return {
        ...initialState,
        resetVersion: state.resetVersion + 1,
      }
    case 'RESET_RENDER_COUNTS':
      return { ...state, resetVersion: state.resetVersion + 1 }
    default:
      return state
  }
}

const PlaygroundContext = createContext(null)

export function PlaygroundProvider({ children }) {
  const [state, dispatch] = useReducer(playgroundReducer, initialState)

  const setMemoEnabled = useCallback(
    (payload) => dispatch({ type: 'SET_MEMO_ENABLED', payload }),
    [],
  )
  const setUseMemoEnabled = useCallback(
    (payload) => dispatch({ type: 'SET_USE_MEMO_ENABLED', payload }),
    [],
  )
  const setUseCallbackEnabled = useCallback(
    (payload) => dispatch({ type: 'SET_USE_CALLBACK_ENABLED', payload }),
    [],
  )
  const setControlValue = useCallback(
    (payload) => dispatch({ type: 'SET_CONTROL_VALUE', payload }),
    [],
  )
  const setSliderValue = useCallback(
    (payload) => dispatch({ type: 'SET_SLIDER_VALUE', payload }),
    [],
  )
  const setActivePanel = useCallback(
    (payload) => dispatch({ type: 'SET_ACTIVE_PANEL', payload }),
    [],
  )
  const setActiveView = useCallback(
    (payload) => dispatch({ type: 'SET_ACTIVE_VIEW', payload }),
    [],
  )
  const forceRender = useCallback(() => dispatch({ type: 'FORCE_RENDER' }), [])
  const resetPlayground = useCallback(() => dispatch({ type: 'RESET_PLAYGROUND' }), [])
  const resetRenderCounts = useCallback(
    () => dispatch({ type: 'RESET_RENDER_COUNTS' }),
    [],
  )

  const value = useMemo(
    () => ({
      state,
      dispatch,
      setMemoEnabled,
      setUseMemoEnabled,
      setUseCallbackEnabled,
      setControlValue,
      setSliderValue,
      setActivePanel,
      setActiveView,
      forceRender,
      resetPlayground,
      resetRenderCounts,
    }),
    [
      state,
      dispatch,
      setMemoEnabled,
      setUseMemoEnabled,
      setUseCallbackEnabled,
      setControlValue,
      setSliderValue,
      setActivePanel,
      setActiveView,
      forceRender,
      resetPlayground,
      resetRenderCounts,
    ],
  )

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>
}

export function usePlayground() {
  const context = useContext(PlaygroundContext)

  if (!context) {
    throw new Error('usePlayground must be used within a PlaygroundProvider')
  }

  return context
}
