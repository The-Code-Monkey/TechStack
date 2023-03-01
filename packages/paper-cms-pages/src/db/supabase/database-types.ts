export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          description?: string | null;
        };
      };
      blog: {
        Row: {
          id: number;
          title: string;
          content: string;
          href: string;
        };
      };
      authCode: {
        Row: {
          id: number;
          code: string;
          used: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_table_name: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      get_table_fields: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      get_auth_code: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
