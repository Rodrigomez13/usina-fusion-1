import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type AdSet = Database["public"]["Tables"]["ad_sets"]["Row"]

export const AdSetService = {
  // Obtener todos los conjuntos de anuncios
  async getAdSets(): Promise<AdSet[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ad_sets").select("*").order("name")

    if (error) {
      console.error("Error fetching ad sets:", error)
      return []
    }

    return data || []
  },

  // Obtener un conjunto de anuncios por ID
  async getAdSetById(id: string): Promise<AdSet | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ad_sets").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching ad set with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Crear un nuevo conjunto de anuncios
  async createAdSet(adSet: Omit<AdSet, "id" | "created_at" | "updated_at">): Promise<AdSet | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("ad_sets")
      .insert([
        {
          ...adSet,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating ad set:", error)
      return null
    }

    return data
  },

  // Actualizar un conjunto de anuncios
  async updateAdSet(
    id: string,
    updates: Partial<Omit<AdSet, "id" | "created_at" | "updated_at">>,
  ): Promise<AdSet | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("ad_sets")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating ad set with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Obtener conjuntos de anuncios por campaña
  async getAdSetsByCampaign(campaignId: string): Promise<AdSet[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("ad_sets").select("*").eq("campaign_id", campaignId).order("name")

    if (error) {
      console.error(`Error fetching ad sets for campaign ${campaignId}:`, error)
      return []
    }

    return data || []
  },
}
