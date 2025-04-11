export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      ad_sets: {
        Row: {
          id: string
          campaign_id: string
          name: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          name: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          name?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      ads: {
        Row: {
          id: string
          ad_set_id: string
          name: string
          creative_url?: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ad_set_id: string
          name: string
          creative_url?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ad_set_id?: string
          name?: string
          creative_url?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      apis: {
        Row: {
          id: string
          name: string
          token: string
          phone: string
          messages_per_day: number
          monthly_cost: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          token: string
          phone: string
          messages_per_day?: number
          monthly_cost?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          token?: string
          phone?: string
          messages_per_day?: number
          monthly_cost?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          employee_id: string
          date: string
          hours_worked: number
          overtime: number
          day_off_worked: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          date: string
          hours_worked: number
          overtime?: number
          day_off_worked?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          date?: string
          hours_worked?: number
          overtime?: number
          day_off_worked?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      business_managers: {
        Row: {
          id: string
          portfolio_id: string
          name: string
          account_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          name: string
          account_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          name?: string
          account_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          business_manager_id: string
          name: string
          objective: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_manager_id: string
          name: string
          objective: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_manager_id?: string
          name?: string
          objective?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          name: string
          role: string
          shift: string
          account: string
          salary: number
          day_off: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          shift: string
          account: string
          salary: number
          day_off: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          shift?: string
          account?: string
          salary?: number
          day_off?: string
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          category: string
          description: string
          amount: number
          date: string
          payment_method: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          description: string
          amount: number
          date: string
          payment_method: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          description?: string
          amount?: number
          date?: string
          payment_method?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      financial_records: {
        Row: {
          id: string
          month: string
          year: number
          total_income: number
          total_ad_spend: number
          total_administrative_expenses: number
          total_salaries: number
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          month: string
          year: number
          total_income: number
          total_ad_spend: number
          total_administrative_expenses: number
          total_salaries: number
          balance: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          month?: string
          year?: number
          total_income?: number
          total_ad_spend?: number
          total_administrative_expenses?: number
          total_salaries?: number
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      franchise_payments: {
        Row: {
          id: string
          franchise_id: string
          amount: number
          date: string
          payment_method: string
          description?: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          franchise_id: string
          amount: number
          date: string
          payment_method: string
          description?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          franchise_id?: string
          amount?: number
          date?: string
          payment_method?: string
          description?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      franchise_phones: {
        Row: {
          id: string
          franchise_id: string
          number: string
          order: number
          daily_goal: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          franchise_id: string
          number: string
          order: number
          daily_goal?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          franchise_id?: string
          number?: string
          order?: number
          daily_goal?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      franchises: {
        Row: {
          id: string
          name: string
          password: string
          cvu: string
          alias: string
          owner: string
          link: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          password: string
          cvu: string
          alias: string
          owner: string
          link: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          password?: string
          cvu?: string
          alias?: string
          owner?: string
          link?: string
          created_at?: string
          updated_at?: string
        }
      }
      incomes: {
        Row: {
          id: string
          franchise_id: string
          concept: string
          amount: number
          date: string
          payment_method: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          franchise_id: string
          concept: string
          amount: number
          date: string
          payment_method: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          franchise_id?: string
          concept?: string
          amount?: number
          date?: string
          payment_method?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      lead_distributions: {
        Row: {
          id: string
          franchise_id: string
          franchise_phone_id: string
          leads_count: number
          server_id: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          franchise_id: string
          franchise_phone_id: string
          leads_count: number
          server_id: string
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          franchise_id?: string
          franchise_phone_id?: string
          leads_count?: number
          server_id?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      payroll: {
        Row: {
          id: string
          employee_id: string
          month: string
          year: number
          base_salary: number
          overtime_pay: number
          total_payment: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          month: string
          year: number
          base_salary: number
          overtime_pay?: number
          total_payment: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          month?: string
          year?: number
          base_salary?: number
          overtime_pay?: number
          total_payment?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          name: string
          description?: string
          card_info?: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          card_info?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          card_info?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      server_ads: {
        Row: {
          id: string
          server_id: string
          ad_id: string
          api_id: string
          daily_budget: number
          leads: number
          loads: number
          spent: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          server_id: string
          ad_id: string
          api_id: string
          daily_budget: number
          leads?: number
          loads?: number
          spent?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          server_id?: string
          ad_id?: string
          api_id?: string
          daily_budget?: number
          leads?: number
          loads?: number
          spent?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      servers: {
        Row: {
          id: string
          name: string
          description?: string
          tax_coefficient: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          tax_coefficient: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          tax_coefficient?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      wallets: {
        Row: {
          id: string
          franchise_id: string
          available_funds: number
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          franchise_id: string
          available_funds: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          franchise_id?: string
          available_funds?: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      view_active_server_ads: {
        Row: {
          id: string | null
          server_id: string | null
          server_name: string | null
          ad_id: string | null
          ad_name: string | null
          api_id: string | null
          api_name: string | null
          api_phone: string | null
          daily_budget: number | null
          leads: number | null
          loads: number | null
          spent: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string | null
          server_id?: string | null
          server_name?: string | null
          ad_id?: string | null
          ad_name?: string | null
          api_id?: string | null
          api_name?: string | null
          api_phone?: string | null
          daily_budget?: number | null
          leads?: number | null
          loads?: number | null
          spent?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string | null
          server_id?: string | null
          server_name?: string | null
          ad_id?: string | null
          ad_name?: string | null
          api_id?: string | null
          api_name?: string | null
          api_phone?: string | null
          daily_budget?: number | null
          leads?: number | null
          loads?: number | null
          spent?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      view_ads_with_hierarchy: {
        Row: {
          ad_id: string | null
          ad_name: string | null
          ad_status: string | null
          ad_set_id: string | null
          ad_set_name: string | null
          ad_set_status: string | null
          campaign_id: string | null
          campaign_name: string | null
          campaign_status: string | null
          business_manager_id: string | null
          business_manager_name: string | null
          business_manager_status: string | null
          portfolio_id: string | null
          portfolio_name: string | null
          portfolio_status: string | null
        }
        Insert: {
          ad_id?: string | null
          ad_name?: string | null
          ad_status?: string | null
          ad_set_id?: string | null
          ad_set_name?: string | null
          ad_set_status?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_status?: string | null
          business_manager_id?: string | null
          business_manager_name?: string | null
          business_manager_status?: string | null
          portfolio_id?: string | null
          portfolio_name?: string | null
          portfolio_status?: string | null
        }
        Update: {
          ad_id?: string | null
          ad_name?: string | null
          ad_status?: string | null
          ad_set_id?: string | null
          ad_set_name?: string | null
          ad_set_status?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_status?: string | null
          business_manager_id?: string | null
          business_manager_name?: string | null
          business_manager_status?: string | null
          portfolio_id?: string | null
          portfolio_name?: string | null
          portfolio_status?: string | null
        }
      }
      view_franchise_distribution: {
        Row: {
          franchise_id: string | null
          franchise_name: string | null
          server_id: string | null
          server_name: string | null
          total_leads: number | null
          date: string | null
        }
        Insert: {
          franchise_id?: string | null
          franchise_name?: string | null
          server_id?: string | null
          server_name?: string | null
          total_leads?: number | null
          date?: string | null
        }
        Update: {
          franchise_id?: string | null
          franchise_name?: string | null
          server_id?: string | null
          server_name?: string | null
          total_leads?: number | null
          date?: string | null
        }
      }
    }
    Functions: {
      activate_ad_in_server: {
        Args: {
          p_ad_id: string
          p_api_id: string
          p_daily_budget: number
          p_server_id: string
        }
        Returns: string
      }
      register_lead_distribution: {
        Args: {
          p_franchise_id: string
          p_franchise_phone_id: string
          p_leads_count: number
          p_server_id: string
        }
        Returns: string
      }
      update_server_ad_metrics: {
        Args: {
          p_server_ad_id: string
          p_leads: number
          p_loads: number
          p_spent: number
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
