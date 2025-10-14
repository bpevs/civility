import { colors } from '@cliffy/ansi/colors'

export const icons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
  watch: '👀',
  stop: '🛑',
} as const

export const theme = {
  success: colors.green,
  error: colors.red,
  warning: colors.yellow,
  info: colors.blue,
  primary: colors.cyan,
  muted: colors.dim,
  bold: colors.bold,
} as const

export function formatMessage(
  icon: keyof typeof icons,
  message: string,
  color?: keyof typeof theme,
): string {
  const colorFn = color ? theme[color] : theme.info
  return `${colorFn(icons[icon])} ${message}`
}

export function logSuccess(message: string): void {
  console.log(formatMessage('success', message, 'success'))
}

export function logError(message: string): void {
  console.error(formatMessage('error', message, 'error'))
}

export function logWarning(message: string): void {
  console.warn(formatMessage('warning', message, 'warning'))
}

export function logInfo(message: string): void {
  console.log(formatMessage('info', message, 'info'))
}

export function formatDuration(ms: number): string {
  return (ms < 1000) ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)}${units[unitIndex]}`
}

export function table(data: Record<string, string | number>): void {
  const maxKeyLength = Math.max(...Object.keys(data).map((k) => k.length))

  for (const [key, value] of Object.entries(data)) {
    const paddedKey = key.padEnd(maxKeyLength)
    console.log(`  ${theme.muted(paddedKey)} ${theme.bold(String(value))}`)
  }
}
