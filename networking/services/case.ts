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
