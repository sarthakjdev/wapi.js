import { type z } from 'zod'
import { type BaseManagerInterface } from '../base/interface'
import { type GetMediaUrlResponseBodySchemaType } from './schema'

/**
 * Media manager interface
 * @interface
 * @extends {BaseManagerInterface}
 */
export interface MediaManagerInterface extends BaseManagerInterface {
	getUrl: (mediaId: string) => Promise<z.infer<typeof GetMediaUrlResponseBodySchemaType>>
	upload: (params: { filePath: string; mediaType: string }) => Promise<string>
	delete: (mediaId: string) => Promise<boolean>
}
