const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const ExecutionEnvironment = {
  canUseDOM,
  canUseWorkers: typeof Worker !== 'undefined',
  canUseEventListeners:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canUseDOM && !!(window.addEventListener || (window as any).attachEvent),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: !canUseDOM,
}

export default ExecutionEnvironment
