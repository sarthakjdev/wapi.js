import { type BaseManagerInterface } from '../base/interface'

/**
 * Media manager interface
 * @interface
 * @extends {BaseManagerInterface}
 */
export interface MediaManagerInterface extends BaseManagerInterface {
	getUrl: (mediaId: string) => Promise<string | null>
	upload: (params: { filePath: string; mediaType: string }) => Promise<string>
	delete: (mediaId: string) => Promise<boolean>
}
