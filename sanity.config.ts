import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { deskStructure } from './sanity/deskStructure'

// Define the singleton types so we can reuse them across the config
const singletonTypes = new Set(['profilDesa', 'layananSOP'])

// Actions that should be disabled for singletons (e.g., creating duplicates or deleting)
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Hide 'create new' capabilities for singletons globally
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }
      return prev
    },
    // Filter out actions (like 'delete' and 'duplicate') for singletons to protect them
    actions: (prev, context) => {
      return singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev
    },
  },
})
