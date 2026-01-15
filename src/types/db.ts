export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    public: {
        Tables: {
            companies: {
                Row: {
                    created_at: string
                    domain: string | null
                    email: string | null
                    id: string
                    is_active: boolean
                    lang: Database['public']['Enums']['languages'] | null
                    name: string | null
                    phone: string | null
                    site_url: string | null
                    slug: string
                    social_networks: Json | null
                }
                Insert: {
                    created_at?: string
                    domain?: string | null
                    email?: string | null
                    id?: string
                    is_active?: boolean
                    lang?: Database['public']['Enums']['languages'] | null
                    name?: string | null
                    phone?: string | null
                    site_url?: string | null
                    slug?: string | null
                    social_networks?: Json | null
                }
                Update: {
                    created_at?: string
                    domain?: string | null
                    email?: string | null
                    id?: string
                    is_active?: boolean
                    lang?: Database['public']['Enums']['languages'] | null
                    name?: string | null
                    phone?: string | null
                    site_url?: string | null
                    slug?: string | null
                    social_networks?: Json | null
                }
                Relationships: []
            }
            contacts: {
                Row: {
                    created_at: string
                    email: string | null
                    id: string
                    is_active: boolean | null
                    name: string | null
                    phone: string | null
                    treatment: Database['public']['Enums']['treatments']
                }
                Insert: {
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    phone?: string | null
                    treatment?: Database['public']['Enums']['treatments']
                }
                Update: {
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    phone?: string | null
                    treatment?: Database['public']['Enums']['treatments']
                }
                Relationships: []
            }
            email_templates: {
                Row: {
                    company_id: string
                    created_at: string
                    file_url: string
                    id: string
                    is_active: boolean
                    name: string
                }
                Insert: {
                    company_id: string
                    created_at?: string
                    file_url: string
                    id?: string
                    is_active?: boolean
                    name: string
                }
                Update: {
                    company_id?: string
                    created_at?: string
                    file_url?: string
                    id?: string
                    is_active?: boolean
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'email_templates_company_id_fkey'
                        columns: ['company_id']
                        isOneToOne: false
                        referencedRelation: 'companies'
                        referencedColumns: ['id']
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar: string | null
                    company_id: string
                    created_at: string | null
                    id: string
                    is_active: boolean
                    is_completed: boolean
                    name: string | null
                    phone: string | null
                    role: Database['public']['Enums']['profile_roles']
                }
                Insert: {
                    avatar?: string | null
                    company_id: string
                    created_at?: string | null
                    id: string
                    is_active?: boolean
                    is_completed?: boolean
                    name?: string | null
                    phone?: string | null
                    role?: Database['public']['Enums']['profile_roles']
                }
                Update: {
                    avatar?: string | null
                    company_id?: string
                    created_at?: string | null
                    id?: string
                    is_active?: boolean
                    is_completed?: boolean
                    name?: string | null
                    phone?: string | null
                    role?: Database['public']['Enums']['profile_roles']
                }
                Relationships: [
                    {
                        foreignKeyName: 'profiles_company_id_fkey'
                        columns: ['company_id']
                        isOneToOne: false
                        referencedRelation: 'companies'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            languages: 'es' | 'en'
            profile_roles: 'User' | 'Manager'
            treatments: 'Formal' | 'Casual'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
      ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema['CompositeTypes']
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
      ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never
