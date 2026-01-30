export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      pet_tag_items: {
        Row: {
          animal_type: Database["public"]["Enums"]["animal_type"]
          animal_type_other: string | null
          back_line_1: string
          back_line_2: string | null
          back_line_3: string | null
          created_at: string
          front_line_1: string
          front_line_2: string | null
          id: string
          material: Database["public"]["Enums"]["tag_material"]
          mockup_url: string | null
          order_id: string
          pet_name: string
          pet_name_case: Database["public"]["Enums"]["pet_name_case"]
          shape: string
          size: Database["public"]["Enums"]["tag_size"]
          tag_number: number
        }
        Insert: {
          animal_type?: Database["public"]["Enums"]["animal_type"]
          animal_type_other?: string | null
          back_line_1: string
          back_line_2?: string | null
          back_line_3?: string | null
          created_at?: string
          front_line_1: string
          front_line_2?: string | null
          id?: string
          material?: Database["public"]["Enums"]["tag_material"]
          mockup_url?: string | null
          order_id: string
          pet_name: string
          pet_name_case?: Database["public"]["Enums"]["pet_name_case"]
          shape: string
          size?: Database["public"]["Enums"]["tag_size"]
          tag_number: number
        }
        Update: {
          animal_type?: Database["public"]["Enums"]["animal_type"]
          animal_type_other?: string | null
          back_line_1?: string
          back_line_2?: string | null
          back_line_3?: string | null
          created_at?: string
          front_line_1?: string
          front_line_2?: string | null
          id?: string
          material?: Database["public"]["Enums"]["tag_material"]
          mockup_url?: string | null
          order_id?: string
          pet_name?: string
          pet_name_case?: Database["public"]["Enums"]["pet_name_case"]
          shape?: string
          size?: Database["public"]["Enums"]["tag_size"]
          tag_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pet_tag_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "pet_tag_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_tag_orders: {
        Row: {
          add_image: boolean
          add_ons_total: number
          base_tag_price: number
          created_at: string
          customer_name: string
          date_ordered: string
          email: string | null
          font_choice: string
          icon_placement: Database["public"]["Enums"]["icon_placement"]
          icons: Json
          id: string
          notes: string | null
          order_number: string
          order_total: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_method_other: string | null
          phone_number: string
          preferred_contact: Database["public"]["Enums"]["contact_preference"]
          ready_by: string | null
          signature: string
          signature_date: string
          spelling_confirmed: boolean
          staff_initials: string | null
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          add_image?: boolean
          add_ons_total?: number
          base_tag_price?: number
          created_at?: string
          customer_name: string
          date_ordered?: string
          email?: string | null
          font_choice: string
          icon_placement?: Database["public"]["Enums"]["icon_placement"]
          icons?: Json
          id?: string
          notes?: string | null
          order_number: string
          order_total?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_method_other?: string | null
          phone_number: string
          preferred_contact?: Database["public"]["Enums"]["contact_preference"]
          ready_by?: string | null
          signature: string
          signature_date?: string
          spelling_confirmed?: boolean
          staff_initials?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          add_image?: boolean
          add_ons_total?: number
          base_tag_price?: number
          created_at?: string
          customer_name?: string
          date_ordered?: string
          email?: string | null
          font_choice?: string
          icon_placement?: Database["public"]["Enums"]["icon_placement"]
          icons?: Json
          id?: string
          notes?: string | null
          order_number?: string
          order_total?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_method_other?: string | null
          phone_number?: string
          preferred_contact?: Database["public"]["Enums"]["contact_preference"]
          ready_by?: string | null
          signature?: string
          signature_date?: string
          spelling_confirmed?: boolean
          staff_initials?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      animal_type: "dog" | "cat" | "other"
      contact_preference: "call" | "text" | "email"
      icon_placement: "before" | "after" | "above" | "back"
      order_status: "pending" | "in_progress" | "completed" | "cancelled"
      payment_method: "cash" | "card" | "other"
      pet_name_case: "uppercase" | "mixed"
      tag_material: "brass" | "stainless" | "pink_silver"
      tag_size: "small" | "large"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      animal_type: ["dog", "cat", "other"],
      contact_preference: ["call", "text", "email"],
      icon_placement: ["before", "after", "above", "back"],
      order_status: ["pending", "in_progress", "completed", "cancelled"],
      payment_method: ["cash", "card", "other"],
      pet_name_case: ["uppercase", "mixed"],
      tag_material: ["brass", "stainless", "pink_silver"],
      tag_size: ["small", "large"],
    },
  },
} as const
