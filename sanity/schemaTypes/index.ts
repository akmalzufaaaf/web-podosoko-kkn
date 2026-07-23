import { type SchemaTypeDefinition } from 'sanity'

import { customBlock } from './customBlock'
import { profilDesa } from './profilDesa'
import { layananSOP } from './layananSOP'
import { article } from './article'
import { agenda } from './agenda'
import { mapMarker } from './mapMarker'
import { statistic } from './statistic'
import { sarana } from './sarana'
import { pembangunan } from './pembangunan'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [customBlock, profilDesa, layananSOP, article, agenda, mapMarker, statistic, sarana, pembangunan],
}
