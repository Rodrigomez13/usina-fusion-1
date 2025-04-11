import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type BusinessManager = Database["public"]["Tables"]["business_managers"]["Row"]

export const BusinessManagerService = {
  // Obtener todos los business managers
  async getBusinessManagers(): Promise<BusinessManager[]> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("business_managers").select("*").order("name")

    if (error) {
      console.error("Error fetching business managers:", error)
      return []
    }

    return data || []
  },

  // Obtener un business manager por ID
  async getBusinessManagerById(id: string): Promise<BusinessManager | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("business_managers").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching business manager with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Crear un nuevo business manager
  async createBusinessManager(
    businessManager: Omit<BusinessManager, "id" | "created_at" | "updated_at">,
  ): Promise<BusinessManager | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("business_managers")
      .insert([
        {
          ...businessManager,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating business manager:", error)
      return null
    }

    return data
  },

  // Actualizar un business manager
  async updateBusinessManager(
    id: string,
    updates: Partial<Omit<BusinessManager, "id" | "created_at" | "updated_at">>,
  ): Promise<BusinessManager | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("business_managers")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating business manager with ID ${id}:`, error)
      return null
    }

    return data
  },

  // Obtener el número de campañas activas para un business manager
  async getActiveCampaignsCount(businessManagerId: string): Promise<number> {
    const supabase = createServerSupabaseClient()
    const { count, error } = await supabase
      .from("campaigns")
      .select("*", { count: "exact", head: true })
      .eq("business_manager_id", businessManagerId)
      .eq("status", "active")

    if (error) {
      console.error(`Error counting active campaigns for business manager ${businessManagerId}:`, error)
      return 0
    }

    return count || 0
  },

  // Obtener el portfolio asociado a un business manager
  async getPortfolioForBusinessManager(businessManagerId: string): Promise<string | null> {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("business_managers")
      .select("portfolio_id")
      .eq("id", businessManagerId)
      .single()

    if (error || !data) {
      console.error(`Error fetching portfolio for business manager ${businessManagerId}:`, error)
      return null
    }

    return data.portfolio_id
  },
}
