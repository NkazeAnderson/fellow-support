export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Chats: {
        Row: {
          id: string
          members: string[]
        }
        Insert: {
          id?: string
          members: string[]
        }
        Update: {
          id?: string
          members?: string[]
        }
        Relationships: []
      }
      Messages: {
        Row: {
          chat: string
          createdAt: string
          id: string
          image: string | null
          text: string | null
        }
        Insert: {
          chat: string
          createdAt?: string
          id?: string
          image?: string | null
          text?: string | null
        }
        Update: {
          chat?: string
          createdAt?: string
          id?: string
          image?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Messages_chat_Chats_id_fk"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "Chats"
            referencedColumns: ["id"]
          },
        ]
      }
      Products: {
        Row: {
          available: boolean | null
          createdAt: string
          description: string
          id: string
          name: string
          owner: string | null
          picturesUrl: string[]
          value: number | null
        }
        Insert: {
          available?: boolean | null
          createdAt?: string
          description: string
          id?: string
          name: string
          owner?: string | null
          picturesUrl: string[]
          value?: number | null
        }
        Update: {
          available?: boolean | null
          createdAt?: string
          description?: string
          id?: string
          name?: string
          owner?: string | null
          picturesUrl?: string[]
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_owner_Users_id_fk"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Trades: {
        Row: {
          approvalStatus: Database["public"]["Enums"]["tradeApprovals"]
          createdAt: string
          id: string
          product: string
          productRequested: string
          requestedBy: string
        }
        Insert: {
          approvalStatus?: Database["public"]["Enums"]["tradeApprovals"]
          createdAt?: string
          id?: string
          product: string
          productRequested: string
          requestedBy: string
        }
        Update: {
          approvalStatus?: Database["public"]["Enums"]["tradeApprovals"]
          createdAt?: string
          id?: string
          product?: string
          productRequested?: string
          requestedBy?: string
        }
        Relationships: [
          {
            foreignKeyName: "Trades_product_Products_id_fk"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Trades_productRequested_Products_id_fk"
            columns: ["productRequested"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Trades_requestedBy_Users_id_fk"
            columns: ["requestedBy"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          email: string
          favoriteProducts: string[]
          firstName: string
          id: string
          lastName: string
          profilePiture: string | null
        }
        Insert: {
          email: string
          favoriteProducts?: string[]
          firstName: string
          id?: string
          lastName: string
          profilePiture?: string | null
        }
        Update: {
          email?: string
          favoriteProducts?: string[]
          firstName?: string
          id?: string
          lastName?: string
          profilePiture?: string | null
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
      tradeApprovals: "pending" | "accepted" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      tradeApprovals: ["pending", "accepted", "declined"],
    },
  },
} as const
