import { type Documentation } from '@discordjs/docgen/dist/src/documentation'
import { ApiModel } from '@microsoft/api-extractor-model'
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { IS_DEVELOPMENT, IS_PRODUCTION } from '~/constant'

export async function fetchDocumentationJsonDataFromSlug(version: string) {
    try {

        if (IS_DEVELOPMENT) {
            const res = await readFile(
                join(process.cwd(), '..', '..', 'packages', 'wapi.js', 'docs', 'docs.api.json'),
                'utf8',
            );

            try {
                const parsedJson = JSON.parse(res);

                console.log({ parsedJson })

                return parsedJson

            } catch {
                console.log(res);
                return {};
            }


        } else {
            const response = await fetch(
                `https://raw.githubusercontent.com/sarthakjdev/wapijs-docs-json/main/wapi.js/${version}.json`,
                {
                    method: 'GET'
                }
            ).then(res => res.json())

            console.log(response)


            return response
        }



    } catch (error) {
        console.log(error)
        return null
    }
}
