import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Ad = Database["public"]["Tables"]["ads"]["Row"]
type AdWithHierarchy = Database["public"]["Views"]["view_ads_with_hierarchy"]["Row"]

export const AdService = {
  // Obtener todos los anuncios
  async getAds(): Promise<Ad[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ads").select("*").order("name")

    if (error) {
      console.error("Error fetching ads:", error)
      return []
    }

    return data || []
  },

  // Obtener un anuncio por ID
  async getAdById(id: string): Promise<Ad | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ads").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching ad with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Crear un nuevo anuncio
  async createAd(ad: Omit<Ad, "id" | "created_at" | "updated_at">): Promise<Ad | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("ads")
      .insert([
        {
          ...ad,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating ad:", error)
      return null
    }

    return data
  },

  // Actualizar un anuncio
  async updateAd(id: string, updates: Partial<Omit<Ad, "id" | "created_at" | "updated_at">>): Promise<Ad | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("ads")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating ad with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Obtener anuncios por conjunto de anuncios
  async getAdsByAdSet(adSetId: string): Promise<Ad[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ads").select("*").eq("ad_set_id", adSetId).order("name")

    if (error) {
      console.error(`Error fetching ads for ad set ${adSetId}:`, error)
      return []
    }

    return data || []
  },

  // Obtener anuncios con jerarquía completa
  async getAdsWithHierarchy(): Promise<AdWithHierarchy[]> {
    const supabase = createServerSupabaseClient()

    try {
      // Intentar usar la vista si existe
      const { data, error } = await supabase.from("view_ads_with_hierarchy").select("*")

      if (error) {
        console.error("Error fetching ads with hierarchy from view:", error)

        // Si la vista no existe, hacer una consulta JOIN manual
        const { data: joinData, error: joinError } = await supabase.from("ads").select(`
            id as ad_id,
            name as ad_name,
            status as ad_status,
            ad_set_id,
            ad_sets!inner(
              name as ad_set_name,
              status as ad_set_status,
              campaign_id
            ),
            ad_sets!inner.campaigns!inner(
              name as campaign_name,
              status as campaign_status,
              business_manager_id
            ),
            ad_sets!inner.campaigns!inner.business_managers!inner(
              name as business_manager_name,
              status as business_manager_status,
              portfolio_id
            ),
            ad_sets!inner.campaigns!inner.business_managers!inner.portfolios!inner(
              name as portfolio_name,
              status as portfolio_status
            )
          `)

        if (joinError) {
          console.error("Error fetching ads with hierarchy using joins:", joinError)
          return []
        }

        // Transformar los datos para que coincidan con la estructura de la vista
        return joinData.map((item) => ({
          ad_id: item.ad_id,
          ad_name: item.ad_name,
          ad_status: item.ad_status,
          ad_set_id: item.ad_set_id,
          ad_set_name: item.ad_sets?.ad_set_name,
          ad_set_status: item.ad_sets?.ad_set_status,
          campaign_id: item.ad_sets?.campaign_id,
          campaign_name: item.ad_sets?.campaigns?.campaign_name,
          campaign_status: item.ad_sets?.campaigns?.campaign_status,
          business_manager_id: item.ad_sets?.campaigns?.business_manager_id,
          business_manager_name: item.ad_sets?.campaigns?.business_managers?.business_manager_name,
          business_manager_status: item.ad_sets?.campaigns?.business_managers?.business_manager_status,
          portfolio_id: item.ad_sets?.campaigns?.business_managers?.portfolio_id,
          portfolio_name: item.ad_sets?.campaigns?.business_managers?.portfolios?.portfolio_name,
          portfolio_status: item.ad_sets?.campaigns?.business_managers?.portfolios?.portfolio_status,
        }))
      }

      return data || []
    } catch (error) {
      console.error("Unexpected error fetching ads with hierarchy:", error)
      return []
    }
  },
}
