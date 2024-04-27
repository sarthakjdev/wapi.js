import type EventEmitter from 'events'

export interface WebhookInterface extends EventEmitter {
	getEndpoint(): string
	setEndpoint: (path: string) => void
	getPort: () => number
	setPort: (port: number) => void
	isListening: () => boolean
	listen: (cb: () => void) => void
}
