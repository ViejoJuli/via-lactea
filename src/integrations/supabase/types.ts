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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      evento_trazabilidad: {
        Row: {
          actor_id: string | null
          created_at: string | null
          descripcion: string
          id: string
          operacion_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string | null
          descripcion: string
          id?: string
          operacion_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string | null
          descripcion?: string
          id?: string
          operacion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evento_trazabilidad_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evento_trazabilidad_operacion_id_fkey"
            columns: ["operacion_id"]
            isOneToOne: false
            referencedRelation: "operacion"
            referencedColumns: ["id"]
          },
        ]
      }
      mensaje_negociacion: {
        Row: {
          created_at: string | null
          id: string
          operacion_id: string
          propuesta_hora_recogida: string | null
          propuesta_litros: number | null
          propuesta_precio: number | null
          propuesta_transporte: string | null
          remitente_id: string
          texto: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          operacion_id: string
          propuesta_hora_recogida?: string | null
          propuesta_litros?: number | null
          propuesta_precio?: number | null
          propuesta_transporte?: string | null
          remitente_id: string
          texto: string
        }
        Update: {
          created_at?: string | null
          id?: string
          operacion_id?: string
          propuesta_hora_recogida?: string | null
          propuesta_litros?: number | null
          propuesta_precio?: number | null
          propuesta_transporte?: string | null
          remitente_id?: string
          texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensaje_negociacion_operacion_id_fkey"
            columns: ["operacion_id"]
            isOneToOne: false
            referencedRelation: "operacion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensaje_negociacion_remitente_id_fkey"
            columns: ["remitente_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      municipio: {
        Row: {
          created_at: string | null
          departamento: string
          id: string
          latitud: number
          longitud: number
          nombre: string
        }
        Insert: {
          created_at?: string | null
          departamento: string
          id?: string
          latitud: number
          longitud: number
          nombre: string
        }
        Update: {
          created_at?: string | null
          departamento?: string
          id?: string
          latitud?: number
          longitud?: number
          nombre?: string
        }
        Relationships: []
      }
      notificacion: {
        Row: {
          created_at: string | null
          cuerpo: string
          destinatario_id: string
          enlace: string | null
          id: string
          leida: boolean | null
          tipo: string
          titulo: string
        }
        Insert: {
          created_at?: string | null
          cuerpo: string
          destinatario_id: string
          enlace?: string | null
          id?: string
          leida?: boolean | null
          tipo: string
          titulo: string
        }
        Update: {
          created_at?: string | null
          cuerpo?: string
          destinatario_id?: string
          enlace?: string | null
          id?: string
          leida?: boolean | null
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacion_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      oferta_leche: {
        Row: {
          acceso_vehicular: string | null
          capacidad_almacenamiento: number | null
          created_at: string | null
          disponible_desde: string
          estado: string
          hora_limite_recogida: string
          hora_ordeno: string | null
          id: string
          litros: number
          metodo_enfriamiento: string | null
          municipio_id: string
          numero_reportes: number | null
          precio_litro: number | null
          productor_id: string
          temperatura_declarada: number | null
          tipo_producto: string
          updated_at: string | null
        }
        Insert: {
          acceso_vehicular?: string | null
          capacidad_almacenamiento?: number | null
          created_at?: string | null
          disponible_desde: string
          estado?: string
          hora_limite_recogida: string
          hora_ordeno?: string | null
          id?: string
          litros: number
          metodo_enfriamiento?: string | null
          municipio_id: string
          numero_reportes?: number | null
          precio_litro?: number | null
          productor_id: string
          temperatura_declarada?: number | null
          tipo_producto: string
          updated_at?: string | null
        }
        Update: {
          acceso_vehicular?: string | null
          capacidad_almacenamiento?: number | null
          created_at?: string | null
          disponible_desde?: string
          estado?: string
          hora_limite_recogida?: string
          hora_ordeno?: string | null
          id?: string
          litros?: number
          metodo_enfriamiento?: string | null
          municipio_id?: string
          numero_reportes?: number | null
          precio_litro?: number | null
          productor_id?: string
          temperatura_declarada?: number | null
          tipo_producto?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oferta_leche_municipio_id_fkey"
            columns: ["municipio_id"]
            isOneToOne: false
            referencedRelation: "municipio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oferta_leche_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      operacion: {
        Row: {
          codigo_lote: string
          comprador_id: string
          created_at: string | null
          estado: string
          estado_pago: string
          hora_recogida: string | null
          id: string
          litros_acordados: number | null
          litros_entregados: number | null
          oferta_id: string
          precio_acordado: number | null
          productor_id: string
          punto_recogida: string | null
          quien_transporta: string | null
          temperatura_entrega: number | null
          updated_at: string | null
        }
        Insert: {
          codigo_lote: string
          comprador_id: string
          created_at?: string | null
          estado?: string
          estado_pago?: string
          hora_recogida?: string | null
          id?: string
          litros_acordados?: number | null
          litros_entregados?: number | null
          oferta_id: string
          precio_acordado?: number | null
          productor_id: string
          punto_recogida?: string | null
          quien_transporta?: string | null
          temperatura_entrega?: number | null
          updated_at?: string | null
        }
        Update: {
          codigo_lote?: string
          comprador_id?: string
          created_at?: string | null
          estado?: string
          estado_pago?: string
          hora_recogida?: string | null
          id?: string
          litros_acordados?: number | null
          litros_entregados?: number | null
          oferta_id?: string
          precio_acordado?: number | null
          productor_id?: string
          punto_recogida?: string | null
          quien_transporta?: string | null
          temperatura_entrega?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operacion_comprador_id_fkey"
            columns: ["comprador_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacion_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "oferta_leche"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacion_productor_id_fkey"
            columns: ["productor_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      parada_ruta: {
        Row: {
          oferta_id: string
          orden: number
          ruta_id: string
        }
        Insert: {
          oferta_id: string
          orden: number
          ruta_id: string
        }
        Update: {
          oferta_id?: string
          orden?: number
          ruta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parada_ruta_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "oferta_leche"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parada_ruta_ruta_id_fkey"
            columns: ["ruta_id"]
            isOneToOne: false
            referencedRelation: "ruta_comunitaria"
            referencedColumns: ["id"]
          },
        ]
      }
      perfil: {
        Row: {
          completitud: number | null
          created_at: string | null
          estado: string
          id: string
          municipio_id: string | null
          nombre: string
          organizacion: string | null
          rol: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          completitud?: number | null
          created_at?: string | null
          estado?: string
          id: string
          municipio_id?: string | null
          nombre: string
          organizacion?: string | null
          rol: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          completitud?: number | null
          created_at?: string | null
          estado?: string
          id?: string
          municipio_id?: string | null
          nombre?: string
          organizacion?: string | null
          rol?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perfil_municipio_id_fkey"
            columns: ["municipio_id"]
            isOneToOne: false
            referencedRelation: "municipio"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_calidad: {
        Row: {
          created_at: string | null
          documento_url: string | null
          estado_revision: string
          fecha_muestra: string
          id: string
          laboratorio_emisor: string | null
          oferta_id: string
          prueba: string
          unidad: string | null
          valor: string
        }
        Insert: {
          created_at?: string | null
          documento_url?: string | null
          estado_revision?: string
          fecha_muestra: string
          id?: string
          laboratorio_emisor?: string | null
          oferta_id: string
          prueba: string
          unidad?: string | null
          valor: string
        }
        Update: {
          created_at?: string | null
          documento_url?: string | null
          estado_revision?: string
          fecha_muestra?: string
          id?: string
          laboratorio_emisor?: string | null
          oferta_id?: string
          prueba?: string
          unidad?: string | null
          valor?: string
        }
        Relationships: [
          {
            foreignKeyName: "registro_calidad_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "oferta_leche"
            referencedColumns: ["id"]
          },
        ]
      }
      reporte_oferta: {
        Row: {
          created_at: string | null
          motivo: string
          oferta_id: string
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          motivo: string
          oferta_id: string
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          motivo?: string
          oferta_id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reporte_oferta_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "oferta_leche"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reporte_oferta_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      ruta_comunitaria: {
        Row: {
          capacidad_vehiculo: number
          created_at: string | null
          estado: string
          id: string
          municipio_destino_id: string
          transportador_id: string | null
          updated_at: string | null
        }
        Insert: {
          capacidad_vehiculo: number
          created_at?: string | null
          estado?: string
          id?: string
          municipio_destino_id: string
          transportador_id?: string | null
          updated_at?: string | null
        }
        Update: {
          capacidad_vehiculo?: number
          created_at?: string | null
          estado?: string
          id?: string
          municipio_destino_id?: string
          transportador_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruta_comunitaria_municipio_destino_id_fkey"
            columns: ["municipio_destino_id"]
            isOneToOne: false
            referencedRelation: "municipio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ruta_comunitaria_transportador_id_fkey"
            columns: ["transportador_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitud_compra: {
        Row: {
          acepta_varios: boolean | null
          comprador_id: string
          created_at: string | null
          estado: string
          fin_ventana: string
          id: string
          inicio_ventana: string
          litros_maximos: number
          litros_minimos: number
          municipio_destino_id: string
          presupuesto_max_litro: number | null
          pruebas_requeridas: string[] | null
          radio_busqueda_km: number
          temperatura_max_aceptada: number | null
          tipo_producto: string
          updated_at: string | null
        }
        Insert: {
          acepta_varios?: boolean | null
          comprador_id: string
          created_at?: string | null
          estado?: string
          fin_ventana: string
          id?: string
          inicio_ventana: string
          litros_maximos: number
          litros_minimos: number
          municipio_destino_id: string
          presupuesto_max_litro?: number | null
          pruebas_requeridas?: string[] | null
          radio_busqueda_km: number
          temperatura_max_aceptada?: number | null
          tipo_producto: string
          updated_at?: string | null
        }
        Update: {
          acepta_varios?: boolean | null
          comprador_id?: string
          created_at?: string | null
          estado?: string
          fin_ventana?: string
          id?: string
          inicio_ventana?: string
          litros_maximos?: number
          litros_minimos?: number
          municipio_destino_id?: string
          presupuesto_max_litro?: number | null
          pruebas_requeridas?: string[] | null
          radio_busqueda_km?: number
          temperatura_max_aceptada?: number | null
          tipo_producto?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitud_compra_comprador_id_fkey"
            columns: ["comprador_id"]
            isOneToOne: false
            referencedRelation: "perfil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitud_compra_municipio_destino_id_fkey"
            columns: ["municipio_destino_id"]
            isOneToOne: false
            referencedRelation: "municipio"
            referencedColumns: ["id"]
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
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
