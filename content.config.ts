import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Una sola colección de páginas. La ruta se deriva de la ubicación del archivo:
//   content/watches/casio/marlin-mdv-106.md  -> /watches/casio/marlin-mdv-106
//   content/reviews/top-divers-aliexpress.md -> /reviews/top-divers-aliexpress
// `kind` distingue ficha de reloj ('watch') de artículo/guía ('article').
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        kind: z.enum(['watch', 'article']),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        publishedAt: z.string(),
        // Multimedia / enlaces (opcionales)
        youtube: z.string().optional(),
        affiliate: z.string().optional(),
        gallery: z.array(z.string()).optional(),
        // Específicos de ficha de reloj (opcionales en el schema)
        brand: z.string().optional(),
        model: z.string().optional(),
        price: z.number().optional(),
        rating: z.number().optional(),
        movement: z.string().optional(),
        type: z.string().optional(),
        waterResistance: z.number().optional(),
        material: z.string().optional(),
        bezel: z.string().optional(),
        mirror: z.string().optional(),
        size: z.number().optional(),
        colors: z.array(z.string()).optional(),
        country: z.string().optional()
      })
    })
  }
})
