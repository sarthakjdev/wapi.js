import { type BaseManagerInterface } from '../base/interface'

export interface MediaManagerInterface extends BaseManagerInterface {
	getUrl: (mediaId: string) => Promise<any> // get type of media and their object type and map the typing here
	upload: (params: { filePath: string; mediaType: string }) => Promise<any> // get the necesary upload response may be get the media id in case of successful response and emit error eevent in case of error event
	delete: (mediaId: string) => Promise<boolean>
}
