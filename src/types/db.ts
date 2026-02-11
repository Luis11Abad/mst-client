export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: '14.1'
    }
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
                    slug: string
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
                    slug?: string
                    social_networks?: Json | null
                }
                Relationships: []
            }
            contacts: {
                Row: {
                    added_by_id: string
                    company_id: string
                    created_at: string
                    email: string | null
                    id: string
                    is_active: boolean | null
                    name: string | null
                    phone: string | null
                    treatment: Database['public']['Enums']['treatments']
                }
                Insert: {
                    added_by_id: string
                    company_id: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    phone?: string | null
                    treatment?: Database['public']['Enums']['treatments']
                }
                Update: {
                    added_by_id?: string
                    company_id?: string
                    created_at?: string
                    email?: string | null
                    id?: string
                    is_active?: boolean | null
                    name?: string | null
                    phone?: string | null
                    treatment?: Database['public']['Enums']['treatments']
                }
                Relationships: [
                    {
                        foreignKeyName: 'contacts_added_by_id_fkey'
                        columns: ['added_by_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'contacts_company_id_fkey'
                        columns: ['company_id']
                        isOneToOne: false
                        referencedRelation: 'companies'
                        referencedColumns: ['id']
                    },
                ]
            }
            email_submissions: {
                Row: {
                    company_id: string | null
                    contact_id: string
                    created_at: string
                    email_template_id: string | null
                    email_template_variant_id: string | null
                    file: string
                    id: string
                    sender_id: string
                }
                Insert: {
                    company_id?: string | null
                    contact_id: string
                    created_at?: string
                    email_template_id?: string | null
                    email_template_variant_id?: string | null
                    file: string
                    id: string
                    sender_id: string
                }
                Update: {
                    company_id?: string | null
                    contact_id?: string
                    created_at?: string
                    email_template_id?: string | null
                    email_template_variant_id?: string | null
                    file?: string
                    id?: string
                    sender_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'email_submissions_company_id_fkey'
                        columns: ['company_id']
                        isOneToOne: false
                        referencedRelation: 'companies'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'email_submissions_contact_id_fkey'
                        columns: ['contact_id']
                        isOneToOne: false
                        referencedRelation: 'contacts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'email_submissions_email_template_id_fkey'
                        columns: ['email_template_id']
                        isOneToOne: false
                        referencedRelation: 'email_submissions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'email_submissions_email_template_variant_id_fkey'
                        columns: ['email_template_variant_id']
                        isOneToOne: false
                        referencedRelation: 'email_template_variants'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'email_submissions_sender_id_fkey1'
                        columns: ['sender_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                ]
            }
            email_template_variants: {
                Row: {
                    created_at: string
                    description: string
                    email_template_id: string
                    file_url: string | null
                    id: string
                    is_active: boolean
                }
                Insert: {
                    created_at?: string
                    description: string
                    email_template_id: string
                    file_url?: string | null
                    id: string
                    is_active?: boolean
                }
                Update: {
                    created_at?: string
                    description?: string
                    email_template_id?: string
                    file_url?: string | null
                    id?: string
                    is_active?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'email_template_variants_email_template_id_fkey'
                        columns: ['email_template_id']
                        isOneToOne: false
                        referencedRelation: 'email_templates'
                        referencedColumns: ['id']
                    },
                ]
            }
            email_templates: {
                Row: {
                    company_id: string
                    created_at: string
                    id: string
                    is_active: boolean
                    name: string
                }
                Insert: {
                    company_id: string
                    created_at?: string
                    id?: string
                    is_active?: boolean
                    name: string
                }
                Update: {
                    company_id?: string
                    created_at?: string
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
            event_participants: {
                Row: {
                    contact_id: string | null
                    created_at: string
                    event_id: string
                    id: string
                    is_confirmed: boolean
                    profile_id: string | null
                }
                Insert: {
                    contact_id?: string | null
                    created_at?: string
                    event_id: string
                    id?: string
                    is_confirmed?: boolean
                    profile_id?: string | null
                }
                Update: {
                    contact_id?: string | null
                    created_at?: string
                    event_id?: string
                    id?: string
                    is_confirmed?: boolean
                    profile_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'event_participants_contact_id_fkey'
                        columns: ['contact_id']
                        isOneToOne: false
                        referencedRelation: 'contacts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'event_participants_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'event_participants_profile_id_fkey'
                        columns: ['profile_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                ]
            }
            events: {
                Row: {
                    added_by_id: string
                    company_id: string
                    created_at: string
                    date: string
                    description: string
                    end_time: string
                    id: string
                    is_canceled: boolean
                    start_time: string
                    type: Database['public']['Enums']['event_types']
                    updated_at: string
                }
                Insert: {
                    added_by_id: string
                    company_id: string
                    created_at?: string
                    date: string
                    description: string
                    end_time: string
                    id?: string
                    is_canceled?: boolean
                    start_time: string
                    type: Database['public']['Enums']['event_types']
                    updated_at?: string
                }
                Update: {
                    added_by_id?: string
                    company_id?: string
                    created_at?: string
                    date?: string
                    description?: string
                    end_time?: string
                    id?: string
                    is_canceled?: boolean
                    start_time?: string
                    type?: Database['public']['Enums']['event_types']
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'events_added_by_id_fkey'
                        columns: ['added_by_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'events_company_id_fkey'
                        columns: ['company_id']
                        isOneToOne: false
                        referencedRelation: 'companies'
                        referencedColumns: ['id']
                    },
                ]
            }
            notifications: {
                Row: {
                    body: string | null
                    created_at: string
                    email_submission_id: string | null
                    id: number
                    is_read: boolean
                    metadata: Json | null
                    profile_id: string
                    type: Database['public']['Enums']['notification_types']
                }
                Insert: {
                    body?: string | null
                    created_at?: string
                    email_submission_id?: string | null
                    id?: number
                    is_read?: boolean
                    metadata?: Json | null
                    profile_id: string
                    type: Database['public']['Enums']['notification_types']
                }
                Update: {
                    body?: string | null
                    created_at?: string
                    email_submission_id?: string | null
                    id?: number
                    is_read?: boolean
                    metadata?: Json | null
                    profile_id?: string
                    type?: Database['public']['Enums']['notification_types']
                }
                Relationships: [
                    {
                        foreignKeyName: 'notifications_email_submission_id_fkey'
                        columns: ['email_submission_id']
                        isOneToOne: false
                        referencedRelation: 'email_submissions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'notifications_profile_id_fkey'
                        columns: ['profile_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar: string | null
                    company_id: string
                    created_at: string | null
                    email: string
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
                    email: string
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
                    email?: string
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
            create_event_with_participants:
                | {
                      Args: {
                          p_added_by_id: string
                          p_company_id: string
                          p_date: string
                          p_description: string
                          p_end_time: string
                          p_participants: Json
                          p_start_time: string
                          p_type: string
                      }
                      Returns: Json
                  }
                | {
                      Args: {
                          p_added_by_id: string
                          p_company_id: string
                          p_description: string
                          p_end_time: string
                          p_participants: Json
                          p_start_time: string
                          p_type: string
                      }
                      Returns: Json
                  }
            get_my_company_id: { Args: never; Returns: string }
        }
        Enums: {
            event_types: 'Meet' | 'Show' | 'Contract' | 'Delivery'
            languages: 'es' | 'en'
            notification_types: 'lead' | 'open' | 'click'
            profile_roles: 'User' | 'Manager'
            treatments: 'Formal' | 'Casual'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
            DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] &
            DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema['Tables']
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema['Tables']
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema['Enums']
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema['CompositeTypes']
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
    public: {
        Enums: {
            event_types: ['Meet', 'Show', 'Contract', 'Delivery'],
            languages: ['es', 'en'],
            notification_types: ['lead', 'open', 'click'],
            profile_roles: ['User', 'Manager'],
            treatments: ['Formal', 'Casual'],
        },
    },
} as const
