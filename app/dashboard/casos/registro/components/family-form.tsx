import { useForm, useFieldArray } from 'react-hook-form';
import { Fragment } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Flex,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormTabs } from '../hooks/useFormTabs';
import { FamilyMemberRelation } from '@/networking/services/case';

const familyFormSchema = z.object({
  mother_nombre: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  mother_apellido: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  mother_carnet_de_identidad: z
    .string()
    .nonempty('Requerido')
    .max(20, { message: 'Maximo 20 caracteres' }),
  mother_fecha_de_nacimiento: z.string().nonempty('Requerido'),
  mother_numbero_de_Casa: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  mother_nombre_de_Calle_Avenida: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  mother_barrio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  mother_zona: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  mother_municipio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  mother_telefono: z.string().max(20, { message: 'Maximo 20 caracteres' }),
  mother_ocupacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  mother_lugar_trabajo: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  mother_direccion_trabajo: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  father_nombre: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  father_apellido: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  father_carnet_de_identidad: z
    .string()
    .nonempty('Requerido')
    .max(20, { message: 'Maximo 20 caracteres' }),
  father_fecha_de_nacimiento: z.string().nonempty('Requerido'),
  father_numbero_de_Casa: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  father_nombre_de_Calle_Avenida: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  father_barrio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  father_zona: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  father_municipio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  father_telefono: z.string().max(20, { message: 'Maximo 20 caracteres' }),
  father_ocupacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  father_lugar_trabajo: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  father_direccion_trabajo: z
    .string()
    .max(50, { message: 'Maximo 50 caracteres' }),
  siblings: z.array(
    z.object({
      nombre: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      apellido: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      carnet_de_indentidad: z
        .string()
        .max(20, { message: 'Maximo 20 caracteres' }),
      fecha_de_nacimiento: z.string().nonempty('Requerido'),
      genero: z.enum(['masculino', 'femenino', 'otro']).nullish(),
      numero_de_Casa: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      nombre_de_Calle_Avenida: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      barrio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      zona: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      municipio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      telefono: z.string().max(20, { message: 'Maximo 20 caracteres' }),
      ocupacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      lugar_trabajo: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      direccion_trabajo: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
    })
  ),
  familyMembers: z.array(
    z.object({
      nombre: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      apellido: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      carnet_de_indentidad: z
        .string()
        .max(20, { message: 'Maximo 20 caracteres' }),
      genero: z.enum(['masculino', 'femenino', 'otro']).nullish(),
      fecha_nacimiento: z.string().nonempty('Requerido'),
      numero_de_Casa: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      nombre_de_Calle_Avenida: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      barrio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      zona: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      municipio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      telefono: z.string().max(20, { message: 'Maximo 20 caracteres' }),
      ocupacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      lugar_trabajo: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      direccion_trabajo: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      parentesco: z.nativeEnum(FamilyMemberRelation).nullish(),
    })
  ),
  personsOfInterest: z.array(
    z.object({
      nombre: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      apellido: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' })
        .nonempty('Requerido'),
      carnet_de_indentidad: z
        .string()
        .max(20, { message: 'Maximo 20 caracteres' }),
      genero: z.enum(['masculino', 'femenino', 'otro']).nullish(),
      fecha_nacimiento: z.string().nonempty('Requerido'),
      numero_de_Casa: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      nombre_de_Calle_Avenida: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      barrio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      zona: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      municipio: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      numero_telefono_de_contacto: z
        .string()
        .max(20, { message: 'Maximo 20 caracteres' }),
      ocupacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      donde_trabaja: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      direccion_trabajo: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      tipo_de_parentesco: z
        .string()
        .max(50, { message: 'Maximo 50 caracteres' }),
      relacion: z.string().max(50, { message: 'Maximo 50 caracteres' }),
      confiabilidad: z
        .enum(['confiable', 'no confiable', 'no se sabe'])
        .nullish(),
      numero_telefono_de_referencia: z
        .string()
        .max(20, { message: 'Maximo 20 caracteres' }),
    })
  ),
});

export function FamilyForm() {
  const { handleSubmit, register, control, formState } = useForm<
    TypeOf<typeof familyFormSchema>
  >({
    resolver: zodResolver(familyFormSchema),
  });

  // const { onNextTab } = useFormTabs();

  const {
    fields: siblingsFields,
    append: appendSibling,
    // remove, NOTE: need UI for this
  } = useFieldArray({
    control,
    name: 'siblings',
  });

  const {
    fields: familyMembersFields,
    append: appendFamilyMember,
    // remove, NOTE: need UI for this
  } = useFieldArray({
    control,
    name: 'familyMembers',
  });

  const {
    fields: personsOfInterestFields,
    append: appendPersonOfInterest,
    // remove, NOTE: need UI for this
  } = useFieldArray({
    control,
    name: 'personsOfInterest',
  });

  const onSubmit = (values: TypeOf<typeof familyFormSchema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        marginTop="30px"
        px="20px"
        py="30px"
        display="flex"
        flexDirection="column"
        gap="20px"
        maxWidth="600px"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Familia del NNA
        </Text>
        <Text color="gray" as="p">
          Ingrese toda la informacion de la familia del NNA.
        </Text>

        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Madre
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex flexDirection="column" gap="20px">
                <HStack>
                  <FormControl
                    isInvalid={Boolean(formState.errors.mother_nombre)}
                  >
                    <FormLabel>Nombre:</FormLabel>
                    <Input
                      placeholder="Ingrese su nombre"
                      id="mother_nombre"
                      {...register('mother_nombre')}
                    />
                    <FormErrorMessage>
                      {formState.errors.mother_nombre?.message || 'Invalido'}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(formState.errors.mother_apellido)}
                  >
                    <FormLabel>Appellido:</FormLabel>
                    <Input
                      placeholder="Ingrese su apellido"
                      id="mother_apellido"
                      {...register('mother_apellido')}
                    />
                    <FormErrorMessage>
                      {formState.errors.mother_apellido?.message || 'Invalido'}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl
                  isInvalid={Boolean(
                    formState.errors.mother_carnet_de_identidad
                  )}
                >
                  <FormLabel>Carnet de identidad:</FormLabel>
                  <Input
                    placeholder="Ingrese su carnet de identidad"
                    id="mother_carnet_de_identidad"
                    {...register('mother_carnet_de_identidad')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_carnet_de_identidad?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(
                    formState.errors.mother_fecha_de_nacimiento
                  )}
                >
                  <FormLabel>Fecha de nacimiento:</FormLabel>
                  <Input
                    type="date"
                    placeholder="Ingrese su fecha de nacimiento"
                    id="mother_fecha_de_nacimiento"
                    {...register('mother_fecha_de_nacimiento')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_fecha_de_nacimiento?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_numbero_de_Casa)}
                >
                  <FormLabel>Número de casa:</FormLabel>
                  <Input
                    placeholder="Ingrese su número de casa"
                    id="mother_numbero_de_Casa"
                    {...register('mother_numbero_de_Casa')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_numbero_de_Casa?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(
                    formState.errors.mother_nombre_de_Calle_Avenida
                  )}
                >
                  <FormLabel>Nombre de calle o avenida:</FormLabel>
                  <Input
                    placeholder="Ingrese su nombre de calle o avenida"
                    id="mother_nombre_de_Calle_Avenida"
                    {...register('mother_nombre_de_Calle_Avenida')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_nombre_de_Calle_Avenida?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_barrio)}
                >
                  <FormLabel>Barrio:</FormLabel>
                  <Input
                    placeholder="Ingrese su barrio"
                    id="mother_barrio"
                    {...register('mother_barrio')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_barrio?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(formState.errors.mother_zona)}>
                  <FormLabel>Zona:</FormLabel>
                  <Input
                    placeholder="Ingrese su zona"
                    id="mother_zona"
                    {...register('mother_zona')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_zona?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_municipio)}
                >
                  <FormLabel>Municipio:</FormLabel>
                  <Input
                    placeholder="Ingrese su municipio"
                    id="mother_municipio"
                    {...register('mother_municipio')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_municipio?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_telefono)}
                >
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    placeholder="Ingrese su teléfono"
                    id="mother_telefono"
                    {...register('mother_telefono')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_telefono?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_lugar_trabajo)}
                >
                  <FormLabel>Lugar de trabajo:</FormLabel>
                  <Input
                    placeholder="Ingrese su lugar de trabajo"
                    id="mother_lugar_trabajo"
                    {...register('mother_lugar_trabajo')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_lugar_trabajo?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.mother_direccion_trabajo)}
                >
                  <FormLabel>Dirección de trabajo:</FormLabel>
                  <Input
                    placeholder="Ingrese su dirección de trabajo"
                    id="mother_direccion_trabajo"
                    {...register('mother_direccion_trabajo')}
                  />
                  <FormErrorMessage>
                    {formState.errors.mother_direccion_trabajo?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Padre
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex flexDirection="column" gap="20px">
                <HStack>
                  <FormControl
                    isInvalid={Boolean(formState.errors.father_nombre)}
                  >
                    <FormLabel>Nombre:</FormLabel>
                    <Input
                      placeholder="Ingrese su nombre"
                      id="father_nombre"
                      {...register('father_nombre')}
                    />
                    <FormErrorMessage>
                      {formState.errors.father_nombre?.message || 'Invalido'}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(formState.errors.father_apellido)}
                  >
                    <FormLabel>Appellido:</FormLabel>
                    <Input
                      placeholder="Ingrese su apellido"
                      id="father_apellido"
                      {...register('father_apellido')}
                    />
                    <FormErrorMessage>
                      {formState.errors.father_apellido?.message || 'Invalido'}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl
                  isInvalid={Boolean(
                    formState.errors.father_fecha_de_nacimiento
                  )}
                >
                  <FormLabel>Fecha de nacimiento:</FormLabel>
                  <Input
                    type="date"
                    placeholder="Ingrese su fecha de nacimiento"
                    id="father_fecha_de_nacimiento"
                    {...register('father_fecha_de_nacimiento')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_fecha_de_nacimiento?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.father_numbero_de_Casa)}
                >
                  <FormLabel>Número de casa:</FormLabel>
                  <Input
                    placeholder="Ingrese su número de casa"
                    id="father_numbero_de_Casa"
                    {...register('father_numbero_de_Casa')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_numbero_de_Casa?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(
                    formState.errors.father_nombre_de_Calle_Avenida
                  )}
                >
                  <FormLabel>Nombre de calle o avenida:</FormLabel>
                  <Input
                    placeholder="Ingrese su nombre de calle o avenida"
                    id="father_nombre_de_Calle_Avenida"
                    {...register('father_nombre_de_Calle_Avenida')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_nombre_de_Calle_Avenida?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(formState.errors.father_zona)}>
                  <FormLabel>Zona:</FormLabel>
                  <Input
                    placeholder="Ingrese su zona"
                    id="father_zona"
                    {...register('father_zona')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_zona?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.father_municipio)}
                >
                  <FormLabel>Municipio:</FormLabel>
                  <Input
                    placeholder="Ingrese su municipio"
                    id="father_municipio"
                    {...register('father_municipio')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_municipio?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={Boolean(formState.errors.father_telefono)}
                >
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    placeholder="Ingrese su teléfono"
                    id="father_telefono"
                    {...register('father_telefono')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_telefono?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.father_ocupacion)}
                >
                  <FormLabel>Ocupación:</FormLabel>
                  <Input
                    placeholder="Ingrese su ocupación"
                    id="father_ocupacion"
                    {...register('father_ocupacion')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_ocupacion?.message || 'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.father_lugar_trabajo)}
                >
                  <FormLabel>Lugar de trabajo:</FormLabel>
                  <Input
                    placeholder="Ingrese su lugar de trabajo"
                    id="father_lugar_trabajo"
                    {...register('father_lugar_trabajo')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_lugar_trabajo?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(formState.errors.father_direccion_trabajo)}
                >
                  <FormLabel>Dirección de trabajo:</FormLabel>
                  <Input
                    placeholder="Ingrese su dirección de trabajo"
                    id="father_direccion_trabajo"
                    {...register('father_direccion_trabajo')}
                  />
                  <FormErrorMessage>
                    {formState.errors.father_direccion_trabajo?.message ||
                      'Invalido'}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Hermano
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {siblingsFields.map((item, index) => (
                <Fragment key={index}>
                  <Flex direction="column" gap="20px" marginBottom="20px">
                    <HStack>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.siblings?.[index]?.nombre
                        )}
                      >
                        <FormLabel>Nombre:</FormLabel>
                        <Input
                          placeholder="Ingrese su nombre"
                          id={`siblings.${index}.nombre`}
                          {...register(`siblings.${index}.nombre`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.siblings?.[index]?.nombre
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.siblings?.[index]?.apellido
                        )}
                      >
                        <FormLabel>Apellido:</FormLabel>
                        <Input
                          placeholder="Ingrese su apellido"
                          id={`siblings.${index}].apellido`}
                          {...register(`siblings.${index}.apellido`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.siblings?.[index]?.apellido
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                    </HStack>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.carnet_de_indentidad
                      )}
                    >
                      <FormLabel>Carnet de identidad:</FormLabel>
                      <Input
                        placeholder="Ingrese su carnet de identidad"
                        id={`siblings.${index}.carnet_de_indentidad`}
                        {...register(`siblings.${index}.carnet_de_indentidad`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]
                          ?.carnet_de_indentidad?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.fecha_de_nacimiento
                      )}
                    >
                      <FormLabel>Fecha de nacimiento:</FormLabel>
                      <Input
                        type="date"
                        placeholder="Ingrese su fecha de nacimiento"
                        id={`siblings.${index}.fecha_de_nacimiento`}
                        {...register(`siblings.${index}.fecha_de_nacimiento`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.fecha_de_nacimiento
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.genero
                      )}
                    >
                      <FormLabel>Género:</FormLabel>
                      <Select
                        placeholder="Seleccione su género"
                        id={`siblings.${index}.genero`}
                        {...register(`siblings.${index}.genero`)}
                      >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </Select>
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.genero?.message ||
                          'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.numero_de_Casa
                      )}
                    >
                      <FormLabel>Número de casa:</FormLabel>
                      <Input
                        placeholder="Ingrese su número de casa"
                        id={`siblings.${index}.numbero_de_Casa`}
                        {...register(`siblings.${index}.numero_de_Casa`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.numero_de_Casa
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]
                          ?.nombre_de_Calle_Avenida
                      )}
                    >
                      <FormLabel>Nombre de calle o avenida:</FormLabel>
                      <Input
                        placeholder="Ingrese su nombre de calle o avenida"
                        id={`siblings.${index}.nombre_de_Calle_Avenida`}
                        {...register(
                          `siblings.${index}.nombre_de_Calle_Avenida`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]
                          ?.nombre_de_Calle_Avenida?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.barrio
                      )}
                    >
                      <FormLabel>Barrio:</FormLabel>
                      <Input
                        placeholder="Ingrese su barrio"
                        id={`siblings.${index}.barrio`}
                        {...register(`siblings.${index}.barrio`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.barrio?.message ||
                          'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.zona
                      )}
                    >
                      <FormLabel>Zona:</FormLabel>
                      <Input
                        placeholder="Ingrese su zona"
                        id={`siblings.${index}.zona`}
                        {...register(`siblings.${index}.zona`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.zona?.message ||
                          'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.municipio
                      )}
                    >
                      <FormLabel>Municipio:</FormLabel>
                      <Input
                        placeholder="Ingrese su municipio"
                        id={`siblings.${index}.municipio`}
                        {...register(`siblings.${index}.municipio`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.municipio
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.telefono
                      )}
                    >
                      <FormLabel>Teléfono:</FormLabel>
                      <Input
                        placeholder="Ingrese su teléfono"
                        id={`siblings.${index}.telefono`}
                        {...register(`siblings.${index}.telefono`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.telefono
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.ocupacion
                      )}
                    >
                      <FormLabel>Ocupación:</FormLabel>
                      <Input
                        placeholder="Ingrese su ocupación"
                        id={`siblings.${index}.ocupacion`}
                        {...register(`siblings.${index}.ocupacion`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.ocupacion
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.lugar_trabajo
                      )}
                    >
                      <FormLabel>Lugar de trabajo:</FormLabel>
                      <Input
                        placeholder="Ingrese su lugar de trabajo"
                        id={`siblings.${index}.lugar_trabajo`}
                        {...register(`siblings.${index}.lugar_trabajo`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.lugar_trabajo
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.siblings?.[index]?.direccion_trabajo
                      )}
                    >
                      <FormLabel>Dirección de trabajo:</FormLabel>
                      <Input
                        placeholder="Ingrese su dirección de trabajo"
                        id={`siblings.${index}.direccion_trabajo`}
                        {...register(`siblings.${index}.direccion_trabajo`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.siblings?.[index]?.direccion_trabajo
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Divider marginBlock="20px" />
                </Fragment>
              ))}
              <Button
                variant="outline"
                px="10px"
                py="10px"
                height="48px"
                width="100%"
                marginBlock="10px"
                color="#2843B2"
                borderColor="#2843B2"
                onClick={() => {
                  appendSibling({
                    nombre: '',
                    apellido: '',
                    carnet_de_indentidad: '',
                    fecha_de_nacimiento: '',
                    genero: 'otro',
                    numero_de_Casa: '',
                    nombre_de_Calle_Avenida: '',
                    barrio: '',
                    zona: '',
                    municipio: '',
                    telefono: '',
                    ocupacion: '',
                    lugar_trabajo: '',
                    direccion_trabajo: '',
                  });
                }}
              >
                Agregar herman@
              </Button>
            </AccordionPanel>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Familiares
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {familyMembersFields.map((field, index) => (
                  <Fragment key={index}>
                    <Flex direction="column" gap="20px" marginBottom="20px">
                      <HStack>
                        <FormControl
                          isInvalid={Boolean(
                            formState.errors.familyMembers?.[index]?.nombre
                          )}
                        >
                          <FormLabel>Nombre:</FormLabel>
                          <Input
                            placeholder="Ingrese su nombre"
                            id={`familyMembers.${index}.nombre`}
                            {...register(`familyMembers.${index}.nombre`)}
                          />
                          <FormErrorMessage>
                            {formState.errors.familyMembers?.[index]?.nombre
                              ?.message || 'Invalido'}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={Boolean(
                            formState.errors.familyMembers?.[index]?.apellido
                          )}
                        >
                          <FormLabel>Apellido:</FormLabel>
                          <Input
                            placeholder="Ingrese su apellido"
                            id={`familyMembers.${index}.apellido`}
                            {...register(`familyMembers.${index}.apellido`)}
                          />
                          <FormErrorMessage>
                            {formState.errors.familyMembers?.[index]?.apellido
                              ?.message || 'Invalido'}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]
                            ?.carnet_de_indentidad
                        )}
                      >
                        <FormLabel>Carnet de identidad:</FormLabel>
                        <Input
                          placeholder="Ingrese su carnet de identidad"
                          id={`familyMembers.${index}.carnet_de_indentidad`}
                          {...register(
                            `familyMembers.${index}.carnet_de_indentidad`
                          )}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.carnet_de_indentidad?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]
                            ?.fecha_nacimiento
                        )}
                      >
                        <FormLabel>Fecha de nacimiento:</FormLabel>
                        <Input
                          placeholder="Ingrese su fecha de nacimiento"
                          id={`familyMembers.${index}.fecha_nacimiento`}
                          {...register(
                            `familyMembers.${index}.fecha_nacimiento`
                          )}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.fecha_nacimiento?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.genero
                        )}
                      >
                        <FormLabel>Género:</FormLabel>
                        <Select
                          placeholder="Seleccione su género"
                          id={`familyMembers.${index}.genero`}
                          {...register(`familyMembers.${index}.genero`)}
                        >
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                          <option value="otro">Otro</option>
                        </Select>
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]?.genero
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]
                            ?.numero_de_Casa
                        )}
                      >
                        <FormLabel>Número de casa:</FormLabel>
                        <Input
                          placeholder="Ingrese su número de casa"
                          id={`familyMembers.${index}.numero_de_Casa`}
                          {...register(`familyMembers.${index}.numero_de_Casa`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.numero_de_Casa?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]
                            ?.nombre_de_Calle_Avenida
                        )}
                      >
                        <FormLabel>Nombre de calle o avenida:</FormLabel>
                        <Input
                          placeholder="Ingrese su nombre de calle o avenida"
                          id={`familyMembers.${index}.nombre_de_Calle_Avenida`}
                          {...register(
                            `familyMembers.${index}.nombre_de_Calle_Avenida`
                          )}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.nombre_de_Calle_Avenida?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.barrio
                        )}
                      >
                        <FormLabel>Barrio:</FormLabel>
                        <Input
                          placeholder="Ingrese su barrio"
                          id={`familyMembers.${index}.barrio`}
                          {...register(`familyMembers.${index}.barrio`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]?.barrio
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.telefono
                        )}
                      >
                        <FormLabel>Teléfono:</FormLabel>
                        <Input
                          placeholder="Ingrese su teléfono"
                          id={`familyMembers.${index}.telefono`}
                          {...register(`familyMembers.${index}.telefono`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]?.telefono
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.ocupacion
                        )}
                      >
                        <FormLabel>Ocupación:</FormLabel>
                        <Input
                          placeholder="Ingrese su ocupación"
                          id={`familyMembers.${index}.ocupacion`}
                          {...register(`familyMembers.${index}.ocupacion`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]?.ocupacion
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.lugar_trabajo
                        )}
                      >
                        <FormLabel>Lugar de trabajo:</FormLabel>
                        <Input
                          placeholder="Ingrese su lugar de trabajo"
                          id={`familyMembers.${index}.lugar_trabajo`}
                          {...register(`familyMembers.${index}.lugar_trabajo`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.lugar_trabajo?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]
                            ?.direccion_trabajo
                        )}
                      >
                        <FormLabel>Dirección de trabajo:</FormLabel>
                        <Input
                          placeholder="Ingrese su dirección de trabajo"
                          id={`familyMembers.${index}.direccion_trabajo`}
                          {...register(
                            `familyMembers.${index}.direccion_trabajo`
                          )}
                        />
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]
                            ?.direccion_trabajo?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.familyMembers?.[index]?.parentesco
                        )}
                      >
                        <FormLabel>Parentesco:</FormLabel>
                        <Select
                          placeholder="Seleccione su parentesco"
                          id={`familyMembers.${index}.parentesco`}
                          {...register(`familyMembers.${index}.parentesco`)}
                        >
                          {Object.values(FamilyMemberRelation).map(
                            (relation) => (
                              <option key={relation} value={relation}>
                                {relation}
                              </option>
                            )
                          )}
                        </Select>
                        <FormErrorMessage>
                          {formState.errors.familyMembers?.[index]?.parentesco
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                    <Divider marginBlock="20px" />
                  </Fragment>
                ))}
                <Button
                  variant="outline"
                  px="10px"
                  py="10px"
                  height="48px"
                  width="100%"
                  marginBlock="10px"
                  color="#2843B2"
                  borderColor="#2843B2"
                  onClick={() => {
                    appendFamilyMember({
                      nombre: '',
                      apellido: '',
                      carnet_de_indentidad: '',
                      genero: 'otro',
                      numero_de_Casa: '',
                      nombre_de_Calle_Avenida: '',
                      barrio: '',
                      zona: '',
                      municipio: '',
                      telefono: '',
                      ocupacion: '',
                      lugar_trabajo: '',
                      direccion_trabajo: '',
                      parentesco: 'otro',
                    });
                  }}
                >
                  Agregar miembro de la familia
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Personas Importantes
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {personsOfInterestFields.map((field, index) => (
                <Fragment key={index}>
                  <Flex direction="column" gap="20px" marginBottom="20px">
                    <HStack>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.personsOfInterest?.[index]?.nombre
                        )}
                      >
                        <FormLabel>Nombre:</FormLabel>
                        <Input
                          placeholder="Ingrese su nombre"
                          id={`personsOfInterest.${index}.nombre`}
                          {...register(`personsOfInterest.${index}.nombre`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.personsOfInterest?.[index]?.nombre
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(
                          formState.errors.personsOfInterest?.[index]?.apellido
                        )}
                      >
                        <FormLabel>Apellido:</FormLabel>
                        <Input
                          placeholder="Ingrese su apellido"
                          id={`personsOfInterest.${index}.apellido`}
                          {...register(`personsOfInterest.${index}.apellido`)}
                        />
                        <FormErrorMessage>
                          {formState.errors.personsOfInterest?.[index]?.apellido
                            ?.message || 'Invalido'}
                        </FormErrorMessage>
                      </FormControl>
                    </HStack>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.carnet_de_indentidad
                      )}
                    >
                      <FormLabel>Carnet de identidad:</FormLabel>
                      <Input
                        placeholder="Ingrese su carnet de identidad"
                        id={`personsOfInterest.${index}.carnet_de_indentidad`}
                        {...register(
                          `personsOfInterest.${index}.carnet_de_indentidad`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.carnet_de_indentidad?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.genero
                      )}
                    >
                      <FormLabel>Género:</FormLabel>
                      <Select
                        placeholder="Seleccione su género"
                        id={`personsOfInterest.${index}.genero`}
                        {...register(`personsOfInterest.${index}.genero`)}
                      >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </Select>
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.genero
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.tipo_de_parentesco
                      )}
                    >
                      <FormLabel>Tipo de parentesco:</FormLabel>
                      <Input
                        placeholder="Seleccione su tipo de parentesco"
                        id={`personsOfInterest.${index}.tipo_de_parentesco`}
                        {...register(
                          `personsOfInterest.${index}.tipo_de_parentesco`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.tipo_de_parentesco?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.relacion
                      )}
                    >
                      <FormLabel>Relación:</FormLabel>
                      <Input
                        placeholder="Seleccione su relación"
                        id={`personsOfInterest.${index}.relacion`}
                        {...register(`personsOfInterest.${index}.relacion`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.relacion
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.confiabilidad
                      )}
                    >
                      <FormLabel>Confiabilidad:</FormLabel>
                      <Input
                        placeholder="Seleccione su confiabilidad"
                        id={`personsOfInterest.${index}.confiabilidad`}
                        {...register(
                          `personsOfInterest.${index}.confiabilidad`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.confiabilidad?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.ocupacion
                      )}
                    >
                      <FormLabel>Ocupación:</FormLabel>
                      <Input
                        placeholder="Seleccione su ocupación"
                        id={`personsOfInterest.${index}.ocupacion`}
                        {...register(`personsOfInterest.${index}.ocupacion`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.ocupacion
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.donde_trabaja
                      )}
                    >
                      <FormLabel>¿Dónde trabaja?:</FormLabel>
                      <Input
                        placeholder="Ingrese dónde trabaja"
                        id={`personsOfInterest.${index}.donde_trabaja`}
                        {...register(
                          `personsOfInterest.${index}.donde_trabaja`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.donde_trabaja?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.direccion_trabajo
                      )}
                    >
                      <FormLabel>Dirección de trabajo:</FormLabel>
                      <Input
                        placeholder="Ingrese la dirección de trabajo"
                        id={`personsOfInterest.${index}.direccion_trabajo`}
                        {...register(
                          `personsOfInterest.${index}.direccion_trabajo`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.direccion_trabajo?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.numero_de_Casa
                      )}
                    >
                      <FormLabel>Número de casa:</FormLabel>
                      <Input
                        placeholder="Ingrese el número de casa"
                        id={`personsOfInterest.${index}.numero_de_Casa`}
                        {...register(
                          `personsOfInterest.${index}.numero_de_Casa`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.numero_de_Casa?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.nombre_de_Calle_Avenida
                      )}
                    >
                      <FormLabel>Nombre de calle o avenida:</FormLabel>
                      <Input
                        placeholder="Ingrese el nombre de calle o avenida"
                        id={`personsOfInterest.${index}.nombre_de_Calle_Avenida`}
                        {...register(
                          `personsOfInterest.${index}.nombre_de_Calle_Avenida`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.nombre_de_Calle_Avenida?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.barrio
                      )}
                    >
                      <FormLabel>Barrio:</FormLabel>
                      <Input
                        placeholder="Ingrese el barrio"
                        id={`personsOfInterest.${index}.barrio`}
                        {...register(`personsOfInterest.${index}.barrio`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.barrio
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.zona
                      )}
                    >
                      <FormLabel>Zona:</FormLabel>
                      <Input
                        placeholder="Ingrese la zona"
                        id={`personsOfInterest.${index}.zona`}
                        {...register(`personsOfInterest.${index}.zona`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.zona
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]?.municipio
                      )}
                    >
                      <FormLabel>Municipio:</FormLabel>
                      <Input
                        placeholder="Ingrese el municipio"
                        id={`personsOfInterest.${index}.municipio`}
                        {...register(`personsOfInterest.${index}.municipio`)}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]?.municipio
                          ?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.numero_telefono_de_contacto
                      )}
                    >
                      <FormLabel>Número de teléfono de contacto:</FormLabel>
                      <Input
                        placeholder="Ingrese el número de teléfono de contacto"
                        id={`personsOfInterest.${index}.numero_telefono_de_contacto`}
                        {...register(
                          `personsOfInterest.${index}.numero_telefono_de_contacto`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.numero_telefono_de_contacto?.message || 'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={Boolean(
                        formState.errors.personsOfInterest?.[index]
                          ?.numero_telefono_de_referencia
                      )}
                    >
                      <FormLabel>Número de teléfono de referencia:</FormLabel>
                      <Input
                        placeholder="Ingrese el número de teléfono de referencia"
                        id={`personsOfInterest.${index}.numero_telefono_de_referencia`}
                        {...register(
                          `personsOfInterest.${index}.numero_telefono_de_referencia`
                        )}
                      />
                      <FormErrorMessage>
                        {formState.errors.personsOfInterest?.[index]
                          ?.numero_telefono_de_referencia?.message ||
                          'Invalido'}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Divider marginBlock="20px" />
                </Fragment>
              ))}
              <Button
                variant="outline"
                px="10px"
                py="10px"
                height="48px"
                width="100%"
                marginBlock="10px"
                color="#2843B2"
                borderColor="#2843B2"
                onClick={() => {
                  appendPersonOfInterest({
                    nombre: '',
                    apellido: '',
                    carnet_de_indentidad: '',
                    direccion_trabajo: '',
                    numero_de_Casa: '',
                    nombre_de_Calle_Avenida: '',
                    barrio: '',
                    zona: '',
                    municipio: '',
                    numero_telefono_de_contacto: '',
                    numero_telefono_de_referencia: '',
                    ocupacion: '',
                    confiabilidad: 'no se sabe',
                    relacion: '',
                    fecha_nacimiento: '',
                    donde_trabaja: '',
                    tipo_de_parentesco: '',
                  });
                }}
              >
                Agregar miembro de la familia
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
        position="fixed"
        bottom="0"
        right="0"
        bg="#FCFCFC"
        width="calc(100% - 15rem)"
        py="15px"
        px="60px"
        display="flex"
        justifyContent="flex-end"
        gap="30px"
      >
        <Button
          variant="outline"
          px="24px"
          py="16px"
          height="60px"
          color="#2843B2"
          borderColor="#2843B2"
          type="submit"
        >
          Guardar primera cita
        </Button>
        {/* <Button
          bg="#2843B2"
          color="white"
          px="24px"
          py="16px"
          height="60px"
          rightIcon={<ChevronRightIcon />}
          type="submit"
        >
          Continuar con el seguimiento
        </Button> */}
      </Box>
    </form>
  );
}
