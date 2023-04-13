import { httpClient } from "../http-client";

type Relationship = "abuela" |"abuelo" | "madre" | "padre" |"tio"| "tia"| "hermano"| "hermana" |"primo"| "prima"| "sobrino"| "sobrina"| "padrastro" |"madrastra" |"abuelastro" |"abuelastra" |"hermanastro" |"hermanastra"| "Vecino"| "Vecina" |"Profesor"| "Profesora" |"Inquilino"| "Empleador"| "Enamorado"| "Enamorada"| "Compañero"| "Compañera" |"Conocido por internet" |"Conocida por internet" |"Amigo"| "Amiga"| "Dueño de casa"| "Dueña de casa" |"cuñado"| "cuñada" |"suegro" |"suegra"| "Pastor de Iglesia" |"Otro";

export interface CreateReporterDTO {
  nombre: string
  apellido: string
  rrelacion_con_NNA:Relationship
  institucion: string
  derivado_por: string
  numero_de_Casa?: string
  nombre_de_Calle_Avenida?: string
  barrio?: string
  zona?: string
  municipio?: string
  telefono: string
  celular: string
}

export interface CreateReporterResponseDTO extends CreateReporterDTO {
  codigo_denunciante: number
}

export const createReporter = (body: CreateReporterDTO) => {
  return httpClient.post<CreateReporterResponseDTO>('/denunciante/', body);
};

enum CaseState {
  Activo = "Activo",
  Inactivo = "Inactivo"
}

enum CaseProgram {
  Programa1 = "Programa 1",
  Programa2  = "Programa 2",
  SinContacto =  "Sin contacto"
}

enum CaseSubProgram {
  Activo = "Activo",
  EnSegumiento =  "En seguimiento",
  PorDecisionPropia =  "Por decisión propia",
  PerdidaContacto = "La institución perdió contacto y se está buscando"
}

export interface CreateCaseDTO {
  fecha_inicio: string | null
  fecha_fin: string | null
  estado: CaseState | null
  programa: CaseProgram | null
  subprograma: CaseSubProgram | null
  Recoleccion_de_datos_primera_cita: number | null
  victima: number | null
  actividad: number | null
  denuncia: number | null
  personal_legal_asignado_al_caso: number | null
  Evaluacion_psicologica: number | null
  Grabacion: number | null
}

export interface CreateCaseResponseDTO extends CreateCaseDTO {
  id: string
  codigo_caso: string
  fecha_registro_caso: string
}

export const createCase = (body: CreateCaseDTO) => {
  return httpClient.post<CreateCaseResponseDTO>('/caso/', body);
};