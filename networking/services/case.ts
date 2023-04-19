import { httpClient } from '../http-client';

type Relationship =
  | 'abuela'
  | 'abuelo'
  | 'madre'
  | 'padre'
  | 'tio'
  | 'tia'
  | 'hermano'
  | 'hermana'
  | 'primo'
  | 'prima'
  | 'sobrino'
  | 'sobrina'
  | 'padrastro'
  | 'madrastra'
  | 'abuelastro'
  | 'abuelastra'
  | 'hermanastro'
  | 'hermanastra'
  | 'Vecino'
  | 'Vecina'
  | 'Profesor'
  | 'Profesora'
  | 'Inquilino'
  | 'Empleador'
  | 'Enamorado'
  | 'Enamorada'
  | 'Compañero'
  | 'Compañera'
  | 'Conocido por internet'
  | 'Conocida por internet'
  | 'Amigo'
  | 'Amiga'
  | 'Dueño de casa'
  | 'Dueña de casa'
  | 'cuñado'
  | 'cuñada'
  | 'suegro'
  | 'suegra'
  | 'Pastor de Iglesia'
  | 'Otro';

export interface CreateReporterDTO {
  nombre: string;
  apellido: string;
  rrelacion_con_NNA: Relationship;
  institucion: string;
  derivado_por: string;
  numero_de_Casa?: string;
  nombre_de_Calle_Avenida?: string;
  barrio?: string;
  zona?: string;
  municipio?: string;
  telefono: string;
  celular: string;
}

export interface CreateReporterResponseDTO extends CreateReporterDTO {
  codigo_denunciante: number;
}

export const createReporter = (body: CreateReporterDTO) => {
  return httpClient.post<CreateReporterResponseDTO>('/denunciante/', body);
};

export interface CreateAggressorDTO {
  nombre: string | null;
  apellido: string | null;
  relacion_con_NNA: Relationship | null;
  relacion_con_NNA_otro: string | null;
  fecha_nacimiento: string | null;
  carnet_de_indentidad: string | null;
  genero: string | null;
  genero_otro: string | null;
  escolaridad: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  telefono: string | null;
  celular: string | null;
  residente?: string ;
  imputabilidad?: string;
  tipo_imputabilidad?: string;
  tipo_de_delito?: string;
  tipo_de_delito_otro: string | null;
  insesto?: string ;
  referido_por: string | null;
  observaciones: string | null;
}

export interface CreateAggressorResponseDTO extends CreateAggressorDTO {
  codigo_denunciado: number;
}

export const createAggressor = (body: CreateAggressorDTO) => {
  return httpClient.post<CreateAggressorResponseDTO>('/denunciado/', body);
};

enum CaseState {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}

enum CaseProgram {
  Programa1 = 'Programa 1',
  Programa2 = 'Programa 2',
  SinContacto = 'Sin contacto',
}

enum CaseSubProgram {
  Activo = 'Activo',
  EnSegumiento = 'En seguimiento',
  PorDecisionPropia = 'Por decisión propia',
  PerdidaContacto = 'La institución perdió contacto y se está buscando',
}

export interface CreateCaseDTO {
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  estado?: CaseState | null;
  programa?: CaseProgram | null;
  subprograma?: CaseSubProgram | null;
  Recoleccion_de_datos_primera_cita?: number | null;
  victima: number | null;
  actividad?: number | null;
  denuncia: CreateDenunciaDTO | null;
  personal_legal_asignado_al_caso?: number | null;
  Evaluacion_psicologica?: number | null;
  Grabacion?: number | null;
}

export interface CreateCaseResponseDTO extends CreateCaseDTO {
  id: string;
  codigo_caso: string;
  fecha_registro_caso: string;
}

interface CreateDenunciaDTO {
  denunciado: number
  denunciante: number
}

interface CreateDenunciaResponseDTO extends CreateDenunciaDTO {
  id: number
}

interface PrimeraCitaResponseDTO {
  "id": number,
  "denunciante_o_persona_que_trae_el_caso": number,
  "posible_victima": number,
  "datos_posible_agresor": number
}

export const createCase = async (body: CreateCaseDTO) => {
  try {
    const primerCita = await httpClient.post<PrimeraCitaResponseDTO>('/recolecciones-datos-primera-cita/', {
      denunciante_o_persona_que_trae_el_caso: body.denuncia?.denunciante,
      posible_victima: body.victima,
      datos_posible_agresor: body.denuncia?.denunciado,
    });

    const denuncia = await httpClient.post<CreateDenunciaResponseDTO>('/denuncia/', {
      denunciado: body.denuncia?.denunciado,
      denunciante: body.denuncia?.denunciante,
    });

    return httpClient.post<CreateCaseResponseDTO>('/caso/', {
      ...body,
      denuncia: denuncia.data.id,
      estado: "Activo",
      programa: "Programa 1",
      subprograma: "Activo",
      Recoleccion_de_datos_primera_cita: primerCita.data.id,
    });
  } catch(error) {
    throw new Error("Hubo un error al crear el caso");
  }

};

export enum EducationInstitutions {
  UESanAntoniodePucara = 'U.E. San Antonio de Pucara',
  UEInstitutoAmericano = 'U.E. Instituto Americano',
  ColegioPauloFreire = 'Colegio Paulo Freire',
  UEBritánicoBolivianoDeSacaba = 'U.E. Británico Boliviano de Sacaba',
  UEMejillones = 'U.E. Mejillones',
  UEJesúsDeNazaret = 'U.E Jesús de Nazaret',
  UEEusebioTudelaTapia = 'U.E. Eusebio Tudela Tapia',
  UELaSalle = 'U.E La Salle',
  UEJaimeGutierrezEscalante = 'U.E. Jaime Gutierrez Escalante',
  UE4DeMarzo = 'U.E. 4 de marzo',
  UEAlemánSantaMaría = 'U.E Alemán Santa María',
  UEBartolinaSisa = 'U.E. Bartolina Sisa',
  UEGerardoVargas = 'U.E Gerardo Vargas',
  UEOscarRojasCaballero = 'U.E. Oscar Rojas Caballero',
  UESanAntonio = 'U.E San Antonio',
  Otros = 'otros',
}

export enum Course {
  JardinInicial = 'Jardin/Inicial',
  Kinder = 'Kinder',
  PrimeroDePrimaria = 'Primero de Primaria',
  SegundoDePrimaria = 'Segundo de Primaria',
  TerceroDePrimaria = 'Tercero de Primaria',
  CuartoDePrimaria = 'cuarto de Primaria',
  QuintoDePrimaria = 'Quinto de Primaria',
  SextoDePrimaria = 'Sexto de Primaria',
  PrimeroDeSecundaria = 'Primero de Secundaria',
  SegundoDeSecundaria = 'Segundo de Secundaria',
  TerceroDeSecundaria = 'Tercero de Secundaria',
  CuartoDeSecundaria = 'Cuarto de Secundaria',
  QuintoDeSecundaria = 'Quinto de Secundaria',
  SextoDeSecundaria = 'Sexto de Secundaria',
  Otro = 'Otro',
}

enum YesNo {
  Si = 'si',
  No = 'no',
}

export enum House {
  Propia = 'Propia',
  Alquilado = 'Alquilado',
  Anticretico = 'Anticretico',
  Cedido = 'Cedido',
  Otro = 'Otro',
}

export interface CreateVictimDTO {
  nombre: string;
  apellido: string;
  genero: "masculino" |"femenino" | "otro";
  genero_otro: string | null; // Missing UI
  fecha_nacimiento: string | null;
  carnet_de_indentidad: string | null;
  numero_de_hermanos: number | null; // Missing UI
  estudia?: YesNo | null;
  unidad_educativa: EducationInstitutions | null;
  unidad_educativa_otro: string | null; // Missing UI
  curso: Course | null;
  curso_otro: string | null; // Missing UI
  direccion_unidad_educativa: string | null;
  trabaja: YesNo | null;
  lugar_trabajo: string | null;
  direccion_trabajo: string | null;
  iglesia: string | null;
  numero_de_Casa_NNA: string | null;
  nombre_de_Calle_Avenida_NNA: string | null;
  barrio_NNA: string | null;
  zona_NNA: string | null;
  municipio_NNA: string | null;
  casa: House | null;
  casa_otro: string | null; // Missing UI
  telefono_fijo: string | null;
  celular: string | null;
  embaraza: YesNo | null;
  semanas_de_embarazo: number | null;
  padese_de_alguna_patologia: YesNo | null;
  patologia: string | null;
  // NOTE: the following fields are going to be added as PATCH request
  // madre: number | null;
  // padre: number | null;
  // hermanos: number[];
  // Persona_importante_para_la_Familia: number[];
  // familiares: number[];
}

export const createVictim = (body: CreateVictimDTO) => {
  return httpClient.post('/victima/', body);
};
