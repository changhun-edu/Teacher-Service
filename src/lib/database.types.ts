export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          role: "admin" | "editor" | "viewer";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          role?: "admin" | "editor" | "viewer";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          display_name?: string | null;
          role?: "admin" | "editor" | "viewer";
          updated_at?: string;
        };
      };
      regulation_versions: {
        Row: {
          id: string;
          year: number;
          title: string;
          status: "draft" | "published" | "archived";
          effective_date: string | null;
          pdf_path: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year: number;
          title: string;
          status?: "draft" | "published" | "archived";
          effective_date?: string | null;
          pdf_path?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          year?: number;
          title?: string;
          status?: "draft" | "published" | "archived";
          effective_date?: string | null;
          pdf_path?: string | null;
          published_at?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};
