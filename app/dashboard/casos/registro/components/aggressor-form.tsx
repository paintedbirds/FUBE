import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useFormTabs } from '../hooks/useFormTabs';
import { useCase } from '../hooks/useCase';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAggressor,
  CreateAggressorDTO,
} from '@/networking/services/case';

enum YesNo {
  Yes = 'Si',
  No = 'No',
}

const agressorFormSchema = z.object({
  nombre: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  apellido: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  relacion_con_NNA: z.string(),
  fecha_nacimiento: z.string(),
  carnet_de_indentidad: z
    .string()
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  genero: z.enum(['Masculino', 'Femenino', 'Otro', '']),
  escolaridad: z.string().max(50, { message: 'Cantidad maxima 50 caracteres' }),
  numero_de_Casa: z
    .string()
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  nombre_de_Calle_Avenida: z
    .string()
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  barrio: z.string().max(50, { message: 'Cantidad maxima 50 caracteres' }),
  zona: z.string().max(50, { message: 'Cantidad maxima 50 caracteres' }),
  municipio: z.string().max(50, { message: 'Cantidad maxima 50 caracteres' }),
  telefono: z.string().max(10, { message: 'Cantidad maxima 10 caracteres' }),
  celular: z.string().max(10, { message: 'Cantidad maxima 10 caracteres' }),
  residente: z.enum(['Si', 'No']).nullish(),
  imputabilidad: z.enum(['Si', 'No']).nullish(),
  tipo_imputabilidad: z
    .enum(['Con responabilidad penal', 'Sin responsabilidad penal'])
    .nullish(),
  tipo_de_delito: z
    .enum(['Violacion', 'Abuso sexual', 'Sospecha', 'Estupro', 'Otro'])
    .nullish(),
  tipo_de_delito_otro: z
    .string()
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  insesto: z.enum(['Si', 'No']).nullish(),
  referido_por: z
    .string()
    .max(200, { message: 'Cantidad maxima 200 caracteres' }),
  observaciones: z
    .string()
    .max(500, { message: 'Cantidad maxima 500 caracteres' }),
});

export function AggressorForm() {
  const { handleSubmit, register, control, formState } =
    useForm<CreateAggressorDTO>({
      resolver: zodResolver(agressorFormSchema),
    });
  const { onNextTab } = useFormTabs();
  const { updateCase, saveFirstMeeting, caseRequest } = useCase();
  const toast = useToast();

  const { mutate } = useMutation(createAggressor, {
    onSuccess: (response) => {
      updateCase({ agresor_id: response.data.codigo_denunciado });
      onNextTab();
      toast({
        title: 'Agresor agregado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error al agregar agresor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (values: CreateAggressorDTO) => {
    if (!caseRequest.agresor_id) {
      mutate(values);
    } else {
      onNextTab();
    }
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
      >
        <Text fontSize="2xl" fontWeight="bold">
          Agresor
        </Text>
        <Text color="gray" as="p">
          Ingrese toda la informacion del <Text as="ins">agresor</Text>, todos
          los campos son opcionales.
        </Text>
        <Divider />
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.nombre)}>
            <FormLabel>Nombre:</FormLabel>
            <Input
              placeholder="Ingrese nombre"
              id="nombre"
              {...register('nombre')}
            />
            <FormErrorMessage>
              {String(formState.errors.nombre?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formState.errors.apellido)}>
            <FormLabel>Appellido:</FormLabel>
            <Input
              placeholder="Ingrese apellido"
              id="apellido"
              {...register('apellido')}
            />
            <FormErrorMessage>
              {String(formState.errors.apellido?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.relacion_con_NNA)}>
          <FormLabel>Relacion con NNA:</FormLabel>
          <Select
            placeholder="Ingrese la relación con NNA"
            id="relacion_con_NNA"
            {...register('relacion_con_NNA')}
          >
            <option value="abuela">Abuela</option>
            <option value="abuelo">Abuelo</option>
            <option value="madre">Madre</option>
            <option value="padre">Padre</option>
            <option value="tio">Tio</option>
            <option value="tia">Tia</option>
            <option value="tia">Tia</option>
            <option value="hermano">Hermano</option>
            <option value="hermana">Hermana</option>
            <option value="primo">Primo</option>
            <option value="prima">Prima</option>
            <option value="sobrino">Sobrino</option>
            <option value="sobrina">Sobrina</option>
            <option value="padrastro">Padrastro</option>
            <option value="madrastra">Madrastra</option>
            <option value="abuelastro">Abuelastro</option>
            <option value="abuelastra">Abuelastra</option>
            <option value="hermanastro">Hermanastro</option>
            <option value="hermanastra">Hermanastra</option>
            <option value="hermanastra">Hermanastra</option>
            <option value="Vecino">Vecino</option>
            <option value="Vecina">Vecina</option>
            <option value="Profesor">Profesor</option>
            <option value="Profesora">Profesora</option>
            <option value="Inquilino">Inquilino</option>
            <option value="Empleador">Empleador</option>
            <option value="Enamorado">Enamorado</option>
            <option value="Enamorada">Enamorada</option>
            <option value="Compañero">Compañero</option>
            <option value="Compañera">Compañera</option>
            <option value="Conocido por internet">Conocido por internet</option>
            <option value="Conocida por internet">Conocida por internet</option>
            <option value="Amigo">Amigo</option>
            <option value="Amiga">Amiga</option>
            <option value="Dueño de casa">Dueño de casa</option>
            <option value="Dueña de casa">Dueña de casa</option>
            <option value="cuñado">Cuñado</option>
            <option value="cuñada">Cuñada</option>
            <option value="suegro">Suegro</option>
            <option value="suegra">Suegra</option>
            <option value="Pastor de iglesia">Pastor de Iglesia</option>
            <option value="Otro">Otro</option>
          </Select>
          <FormErrorMessage>
            {String(formState.errors.relacion_con_NNA?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.fecha_nacimiento)}>
          <FormLabel>Fecha de nacimiento:</FormLabel>
          <Input
            type="date"
            id="fecha_nacimiento"
            {...register('fecha_nacimiento')}
          />
          <FormErrorMessage>
            {String(formState.errors.fecha_nacimiento?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.carnet_de_indentidad)}>
          <FormLabel>Carne de Identidad:</FormLabel>
          <Input
            placeholder="Ingrese carne de identidad"
            id="carnet_de_indentidad"
            {...register('carnet_de_indentidad')}
          />
          <FormErrorMessage>
            {String(formState.errors.carnet_de_indentidad?.message) ||
              'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.genero)}>
          <FormLabel>Genero:</FormLabel>
          <Select
            placeholder="Ingrese genero"
            id="genero"
            {...register('genero')}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </Select>
          <FormErrorMessage>
            {String(formState.errors.genero?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.escolaridad)}>
          <FormLabel>Escolaridad:</FormLabel>
          <Input
            placeholder="Ingrese escolaridad"
            id="escolaridad"
            {...register('escolaridad')}
          />
          <FormErrorMessage>
            {String(formState.errors.escolaridad?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.numero_de_Casa)}>
            <FormLabel>Numero de casa:</FormLabel>
            <Input
              placeholder="Ingrese su numero de casa"
              id="numero_de_Casa"
              {...register('numero_de_Casa')}
            />
            <FormErrorMessage>
              {String(formState.errors.numero_de_Casa?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(formState.errors.nombre_de_Calle_Avenida)}
          >
            <FormLabel>Nombre de Calle o Avenida:</FormLabel>
            <Input
              placeholder="Ingrese su calle"
              id="nombre_de_Calle_Avenida"
              {...register('nombre_de_Calle_Avenida')}
            />
            <FormErrorMessage>
              {String(formState.errors.numero_de_Casa?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.barrio)}>
          <FormLabel>Barrio:</FormLabel>
          <Input
            placeholder="Ingrese su barrio"
            id="barrio"
            {...register('barrio')}
          />
          <FormErrorMessage>
            {String(formState.errors.barrio?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.zona)}>
            <FormLabel>Zona:</FormLabel>
            <Input
              placeholder="Ingrese su zona"
              id="zona"
              {...register('zona')}
            />
            <FormErrorMessage>
              {String(formState.errors.zona?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formState.errors.municipio)}>
            <FormLabel>Municipio:</FormLabel>
            <Input
              placeholder="Ingrese su municipio"
              id="municipio"
              {...register('municipio')}
            />
            <FormErrorMessage>
              {String(formState.errors.municipio?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.telefono)}>
          <FormLabel>Telefono:</FormLabel>
          <Input
            placeholder="Ingrese su telefono"
            id="telefono"
            {...register('telefono')}
          />
          <FormErrorMessage>
            {String(formState.errors.telefono?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.celular)}>
          <FormLabel>Celular:</FormLabel>
          <Input
            placeholder="Ingrese su celular"
            id="celular"
            {...register('celular')}
          />
          <FormErrorMessage>
            {String(formState.errors.celular?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.residente)}>
          <FormLabel>Reincidente:</FormLabel>
          <Controller
            name="residente"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="Si">Si</Radio>
                  <Radio value="No">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {String(formState.errors.residente?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.imputabilidad)}>
          <FormLabel>Imputabilidad:</FormLabel>
          <Controller
            name="imputabilidad"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="Si">Si</Radio>
                  <Radio value="No">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {String(formState.errors.imputabilidad?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.tipo_imputabilidad)}>
          <FormLabel>Tipo de Imputabilidad:</FormLabel>
          <Controller
            name="tipo_imputabilidad"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack gap="10px">
                  <Radio value="Imputable">Imputable</Radio>
                  <Radio value="Con responabilidad penal">
                    Con responabilidad penal
                  </Radio>
                  <Radio value="Sin responsabilidad penal">
                    Sin responsabilidad penal
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {String(formState.errors.tipo_imputabilidad?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.tipo_de_delito)}>
          <FormLabel>Tipo de delito:</FormLabel>
          <Controller
            name="tipo_de_delito"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack gap="10px">
                  <Radio value="Violacion">Violacion</Radio>
                  <Radio value="Abuso sexual">Abuso sexual</Radio>
                  <Radio value="Sospecha">Sospecha</Radio>
                  <Radio value="Estupro">Estrupo</Radio>
                  <Radio value="Otro">Otro</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {String(formState.errors.tipo_de_delito?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.insesto)}>
          <FormLabel>Insesto</FormLabel>
          <Controller
            name="insesto"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="Si">Si</Radio>
                  <Radio value="No">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {String(formState.errors.insesto?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.tipo_de_delito_otro)}>
          <FormLabel>En caso de ser &quotOtro&quot:</FormLabel>
          <Input
            placeholder="Ingrese otro"
            id="tipo_de_delito_otro"
            {...register('tipo_de_delito_otro')}
          />
          <FormErrorMessage>
            {String(formState.errors.tipo_de_delito_otro?.message) ||
              'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.referido_por)}>
          <FormLabel>Referido por:</FormLabel>
          <Input
            placeholder="Por quien es referido"
            id="referido_por"
            {...register('referido_por')}
          />
          <FormErrorMessage>
            {String(formState.errors.referido_por?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        {/* <FormControl>
          <FormLabel htmlFor="writeUpFile">Documentos que deja:</FormLabel>
          <InputGroup alignItems="center" gap="10px">
            <input
              type="file"
              // TODO: add props once we have API defined accept={acceptedFileTypes}
              ref={fileRef}
              // @ts-expect-error inputRef is not an allowed prop for input of type file
              inputRef={ref}
              {...inputProps}
              style={{ display: 'none' }}
            />
            <Button
              bg="#2843B2"
              color="white"
              px="24px"
              py="5px"
              height="40px"
              onClick={() => fileRef?.current?.click?.()}
            >
              Importar documentos
            </Button>
            <Text fontSize="md" color="#808080">
              {value ?? 'Nada seleccionado...'}
            </Text>
          </InputGroup>
        </FormControl> */}
        <FormControl isInvalid={Boolean(formState.errors.observaciones)}>
          <FormLabel>Observaciones:</FormLabel>
          <Textarea
            placeholder="Observaciones conseguidas..."
            id="observaciones"
            {...register('observaciones')}
          />
          <FormErrorMessage>
            {String(formState.errors.observaciones?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
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
          onClick={saveFirstMeeting}
        >
          Guardar primera cita
        </Button>
        <Button
          bg="#2843B2"
          color="white"
          px="24px"
          py="16px"
          height="60px"
          rightIcon={<ChevronRightIcon />}
          type="submit"
        >
          Continuar con el seguimiento
        </Button>
      </Box>
    </form>
  );
}
