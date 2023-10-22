import { type Client } from '../../..'
import { type BaseManager } from '../base'

export interface MessagerManagerInterface extends BaseManager {
	client: Client

	send(props: { message: any; phoneNumber: string }): Promise<string>

	read(messageId: string): Promise<boolean>
}
