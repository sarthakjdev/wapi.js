import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import { remarkCodeHike } from '@code-hike/mdx';;
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export const GuideDocument = defineDocumentType(() => ({
  name: 'Content',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/\d+-/g, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/guide/${doc._raw.flattenedPath.replace(/\d+-/g, '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/guide-content',
  documentTypes: [GuideDocument],
  mdx: {
    remarkPlugins: [remarkGfm, [remarkCodeHike]],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class:
              'relative inline-flex place-items-center place-content-center outline-none text-black dark:text-white pr-2 -ml-8 opacity-0 group-hover:opacity-100',
          },
          behavior: 'prepend',
        },
      ],
    ],
  },
});
