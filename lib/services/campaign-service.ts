import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"]

export const CampaignService = {
  // Obtener todas las campañas
  async getCampaigns(): Promise<Campaign[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("campaigns").select("*").order("name")

    if (error) {
      console.error("Error fetching campaigns:", error)
      return []
    }

    return data || []
  },

  // Obtener una campaña por ID
  async getCampaignById(id: string): Promise<Campaign | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("campaigns").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching campaign with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Crear una nueva campaña
  async createCampaign(campaign: Omit<Campaign, "id" | "created_at" | "updated_at">): Promise<Campaign | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("campaigns")
      .insert([
        {
          ...campaign,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating campaign:", error)
      return null
    }

    return data
  },

  // Actualizar una campaña
  async updateCampaign(
    id: string,
    updates: Partial<Omit<Campaign, "id" | "created_at" | "updated_at">>,
  ): Promise<Campaign | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("campaigns")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating campaign with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Obtener campañas por business manager
  async getCampaignsByBusinessManager(businessManagerId: string): Promise<Campaign[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("business_manager_id", businessManagerId)
      .order("name")

    if (error) {
      console.error(`Error fetching campaigns for business manager ${businessManagerId}:`, error)
      return []
    }

    return data || []
  },
}
