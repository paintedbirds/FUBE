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
}

export const createVictim = (body: CreateVictimDTO) => {
  return httpClient.post('/victima/', body);
};

export interface CreateMotherDTO {
  nombre: string;
  apellido: string;
  carnet_de_indentidad: string | null;
  fecha_nacimiento: string | null;
  genero: "masculino" | "femenino" | "otro";
  genero_otro: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  telefono: string | null;
  ocupacion: string | null;
  lugar_trabajo: string | null;
  direccion_trabajo: string | null;
}

export interface CreateMotherResponseDTO extends CreateMotherDTO {
  codigo_madre: number;
}

export const createMother = (body: CreateMotherDTO) => {
  // NOTE: missing hardcode genero
  return httpClient.post<CreateMotherResponseDTO>('/madre/', body);
};

export interface CreateFatherDTO {
  nombre: string;
  apellido: string;
  carnet_de_indentidad: string | null;
  fecha_nacimiento: string | null;
  genero: "masculino" | "femenino" | "otro";
  genero_otro: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  telefono: string | null;
  ocupacion: string | null;
  lugar_trabajo: string | null;
  direccion_trabajo: string | null;
}

export interface CreateFatherResponseDTO extends CreateFatherDTO {
  codigo_padre: number;
}

export const createFather = (body: CreateFatherDTO) => {
  return httpClient.post<CreateFatherResponseDTO>('/padre/', body);
};

export interface CreateSiblingDTO {
  nombre: string;
  apellido: string;
  carnet_de_indentidad: string | null;
  fecha_nacimiento: string | null;
  genero: "masculino" | "femenino" | "otro";
  genero_otro: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  telefono: string | null;
  ocupacion: string | null;
  lugar_trabajo: string | null;
  direccion_trabajo: string | null;
}

export interface CreateSiblingResponseDTO extends CreateSiblingDTO {
  codigo_hermano: number;
}

export const createSibling = (body: CreateSiblingDTO) => {
  return httpClient.post<CreateSiblingResponseDTO>('/hermano/', body);
};

export enum FamilyMemberRelation {
  Abuela = "abuela",
  Abuelo = "abuelo",
  Madre = "madre",
  Padre = "padre",
  Tio = "tio",
  Tia = "tia",
  Hermano = "hermano",
  Hermana = "hermana",
  Primo = "primo",
  Prima = "prima",
  Sobrino = "sobrino",
  Sobrina = "sobrina",
  Padrastro = "padrastro",
  Madrastra = "madrastra",
  Abuelastro = "abuelastro",
  Abuelastra = "abuelastra",
  Hermanastro = "hermanastro",
  Hermanastra = "hermanastra",
  Otro = "otro",
}

export interface CreateFamilyMemberDTO {
  nombre: string;
  apellido: string;
  genero: "masculino" | "femenino" | "otro";
  genero_otro: string | null;
  carnet_de_indentidad: string | null;
  fecha_nacimiento: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  telefono: string | null;
  ocupacion: string | null;
  lugar_trabajo: string | null;
  direccion_trabajo: string | null;
  parentesco: FamilyMemberRelation;
  parentesco_otro: string | null;
}

export interface CreateFamilyMemberResponseDTO extends CreateFamilyMemberDTO {
  codigo_familiar: number;
}

export const createFamilyMember = (body: CreateFamilyMemberDTO) => {
  return httpClient.post<CreateFamilyMemberResponseDTO>('/familiar/', body);
};

export interface CreatePersonOfInterestDTO {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string | null;
  genero: "masculino" | "femenino" | "otro";
  genero_otro: string | null;
  carnet_de_indentidad: string | null;
  tipo_de_parentezco: string | null;
  relacion: string | null;
  confiabilidad: "confiable" | "no confiable" | "no se sabe";
  ocupacion: string | null;
  donde_trabaja: string | null;
  direccion_trabajo: string | null;
  numero_de_Casa: string | null;
  nombre_de_Calle_Avenida: string | null;
  barrio: string | null;
  zona: string | null;
  municipio: string | null;
  numero_telefono_de_contacto: string | null;
  numero_telefono_de_referencia: string | null;
}

export interface CreatePersonOfInterestResponseDTO extends CreatePersonOfInterestDTO {
  codigo_persona_importante_para_la_Familia: number;
}

export const createPersonOfInterest = (body: CreatePersonOfInterestDTO) => {
  return httpClient.post<CreatePersonOfInterestResponseDTO>('/persona-importante/', body);
};

export interface UpdateVictimDTO {
  madre: number | null;
  padre: number | null;
  hermanos: number[];
  Persona_importante_para_la_Familia: number[];
  familiares: number[];
}

export const updateVictim = (id: number, body: Partial<UpdateVictimDTO>) => {
  return httpClient.patch(`/victima/${id}/`, body);
};

export interface AddVictimFamilyDTO {
  madre: CreateMotherDTO | null;
  padre: CreateFatherDTO | null;
  hermanos: CreateSiblingDTO[] | null;
  persona_importante_para_la_familia: CreatePersonOfInterestDTO[] | null;
  familiares: CreateFamilyMemberDTO[] | null;
}

export const addVictimFamily = async (victima: number, params: AddVictimFamilyDTO) => {
  console.log(victima, params);
  
  try {
    const { madre, padre, hermanos, persona_importante_para_la_familia, familiares } = params;

    const victimPatchRequestBody: UpdateVictimDTO = {} as unknown as UpdateVictimDTO;

    if (madre) {
      const { data: { codigo_madre } } = await createMother(madre);

      victimPatchRequestBody.madre = codigo_madre;
    }

    if (padre) {
      const { data: { codigo_padre } } = await createFather(padre);

      victimPatchRequestBody.padre = codigo_padre;
    }

    if (hermanos) {
      hermanos.map(async (hermano) => {
        const { data: { codigo_hermano } } = await createSibling(hermano);

        victimPatchRequestBody.hermanos = [...victimPatchRequestBody.hermanos, codigo_hermano];
      });
    }

    if (persona_importante_para_la_familia) {
      persona_importante_para_la_familia.map(async (persona) => {
        const { data: { codigo_persona_importante_para_la_Familia } } = await createPersonOfInterest(persona);

        victimPatchRequestBody.Persona_importante_para_la_Familia = [...victimPatchRequestBody.Persona_importante_para_la_Familia, codigo_persona_importante_para_la_Familia];
      });
    }

    if (familiares) {
      familiares.map(async (familiar) => {
        const { data: { codigo_familiar } } = await createFamilyMember(familiar);

        victimPatchRequestBody.familiares = [...victimPatchRequestBody.familiares, codigo_familiar];
      });
    }

    const { data } = await updateVictim(victima, victimPatchRequestBody);

    return data;
  } catch (error) {
    throw new Error('Hubo un error al agregar la familia');
  }
};
