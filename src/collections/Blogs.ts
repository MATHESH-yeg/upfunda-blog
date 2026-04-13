import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly e.g. graphs-in-discrete-mathematics',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. September 6, 2023',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        'Arithmetic',
        'Algebra',
        'Geometry',
        'Logic',
        'Number Theory',
        'Probability',
        'Formula',
        'Financial',
        'History',
        'Resources',
        'Competitions',
        'Tips',
        'Education',
        'Parenting',
        'Technology',
        'General',
        'Quiz',
        'Discrete Mathematics',
        'Aptitude',
        'Reasoning',
      ],
    },
    {
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. /assets/img/blogs/placeholders/arithmetic.png',
      },
    },
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Paragraph', value: 'paragraph' },
            { label: 'Heading', value: 'heading' },
            { label: 'Image', value: 'image' },
            { label: 'List', value: 'list' },
            { label: 'Callout', value: 'callout' },
            { label: 'Grid', value: 'grid' },
            { label: 'Visual List', value: 'visual-list' },
            { label: 'Comparison Table', value: 'comparison-table' },
            { label: 'Quiz', value: 'quiz' },
            { label: 'iFrame', value: 'iframe' },
          ],
        },
        // --- paragraph ---
        {
          name: 'content',
          type: 'textarea',
          admin: {
            condition: (_, s) => ['paragraph', 'callout', 'heading'].includes(s?.type),
          },
        },
        {
          name: 'styling',
          type: 'text',
          admin: {
            condition: (_, s) => s?.type === 'paragraph',
            description: 'Optional Tailwind classes',
          },
        },
        // --- heading ---
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'H2', value: '2' },
            { label: 'H3', value: '3' },
          ],
          admin: {
            condition: (_, s) => s?.type === 'heading',
          },
        },
        // --- image ---
        {
          name: 'src',
          type: 'text',
          admin: {
            condition: (_, s) => ['image', 'iframe'].includes(s?.type),
            description: 'Image path or iframe URL',
          },
        },
        {
          name: 'alt',
          type: 'text',
          admin: {
            condition: (_, s) => s?.type === 'image',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            condition: (_, s) => s?.type === 'image',
          },
        },
        // --- list ---
        {
          name: 'listType',
          type: 'select',
          options: [
            { label: 'Unordered (bullets)', value: 'unordered' },
            { label: 'Ordered (numbers)', value: 'ordered' },
          ],
          admin: {
            condition: (_, s) => s?.type === 'list',
          },
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            condition: (_, s) => s?.type === 'list',
          },
          fields: [
            { name: 'text', type: 'text' },
          ],
        },
        // --- callout ---
        {
          name: 'theme',
          type: 'select',
          options: [
  { label: 'Pink', value: 'pink' },
  { label: 'Dark', value: 'dark' },
  { label: 'Blue', value: 'blue' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Pills', value: 'pills' },
  { label: 'Cards', value: 'cards' },
  { label: 'Numbers', value: 'numbers' },
],
          admin: {
            condition: (_, s) => ['callout', 'visual-list'].includes(s?.type),
          },
        },
        {
          name: 'calloutTitle',
          type: 'text',
          admin: {
            condition: (_, s) => s?.type === 'callout',
            description: 'Optional title for callout',
          },
        },
        // --- grid ---
        {
          name: 'columns',
          type: 'number',
          defaultValue: 2,
          admin: {
            condition: (_, s) => s?.type === 'grid',
          },
        },
        {
          name: 'gridItems',
          type: 'array',
          admin: {
            condition: (_, s) => s?.type === 'grid',
          },
          fields: [
            { name: 'title', type: 'text' },
            { name: 'content', type: 'textarea' },
          ],
        },
        // --- visual-list ---
        {
          name: 'visualItems',
          type: 'array',
          admin: {
            condition: (_, s) => s?.type === 'visual-list',
          },
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
        // --- comparison-table ---
{
  name: 'tableHeader',
  type: 'array',
  admin: {
    condition: (_, s) => s?.type === 'comparison-table',
  },
  fields: [{ name: 'text', type: 'text' }],
},
{
  name: 'tableRows',
  type: 'array',
  admin: {
    condition: (_, s) => s?.type === 'comparison-table',
  },
  fields: [
    { name: 'col1', type: 'text' },
    { name: 'col2', type: 'text' },
    { name: 'col3', type: 'text' },  // optional 3rd column
    { name: 'col4', type: 'text' },  // optional 4th column
  ],
},
        // --- quiz ---
        {
          name: 'questions',
          type: 'array',
          admin: {
            condition: (_, s) => s?.type === 'quiz',
          },
          fields: [
            { name: 'id', type: 'number' },
            { name: 'question', type: 'textarea' },
            { name: 'image', type: 'text' },
            {
              name: 'options',
              type: 'array',
              fields: [{ name: 'text', type: 'text' }],
            },
            { name: 'answer', type: 'text' },
            { name: 'explanation', type: 'textarea' },
          ],
        },
        
      ],
    },
  ],  // closes fields
}     // closes Blogs