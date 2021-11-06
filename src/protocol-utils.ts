/**
 * 自动切换到目标协议
 *
 * @param targetProtocol 目标协议
 */
export function autoSwitchToTargetProtocol(targetProtocol = 'https:') {
  const { protocol } = window.location
  if (protocol !== targetProtocol) {
    window.location.href = targetProtocol + window.location.href.substring(window.location.protocol.length)
  }
}
