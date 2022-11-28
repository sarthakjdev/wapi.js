import { MessageComponent } from './MessageComponent'
import { Media } from './doc/IMedia'
import { MediaMessage } from './doc/message/index'

export abstract class MediaMessageComponent extends MessageComponent {
    /**
     * media to be sent in media message component
     * @memberof MediaMessageComponent
     */
    media: Media

    /**
     * constructor to build the media message component
     * @constructor
     * @param {MediaMessageComponent & MessageComponent} data
     */
    constructor(data: MediaMessage) {
        super(data)
        this.media = data.media
    }

    /**
     * set the link of the media message component
     * @param {string} link
     * @returns {this}
     */
    public setLink(link: string): this {
        this.media.link = link

        return this
    }

    /**
     * set the id of the media message component
     * @param {string} id
     * @returns {this}
     */
    public setId(id : string): this {
        this.media.id = id

        return this
    }

    /**
     * set the caption of media message component
     * @param {string} caption
     * @returns {string}
     */
    public setCaption(caption: string): this {
        this.media.caption = caption

        return this
    }

    /**
     * set the filename of media message component
     * @param {string} filename
     * @returns {this}
     */
    public setFilename(filename: string): this {
        this.media.filename = filename

        return this
    }
}
