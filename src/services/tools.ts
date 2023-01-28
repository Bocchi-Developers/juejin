import { message } from 'react-message-popup'

import { getToken } from '~/utils/cookie'

export const handleConfigureAuth = (config: any) => {
  config.headers['authorization'] = getToken() || ''
  return config
}

export const handleNetworkError = (
  success?: boolean,
  msg?: string | string[],
): void => {
  if (success) {
    message.error('未知错误')
    return
  }
  if (typeof msg == 'string') {
    message.error(msg)
  } else if (typeof msg == 'object') {
    message.error(msg.map((item: string) => item).join(' '))
  } else {
    message.error('服务器异常')
  }
}
