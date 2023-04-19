import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Select,
  FormErrorMessage,
  useToast,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Course,
  createVictim,
  CreateVictimDTO,
  EducationInstitutions,
  House,
} from '@/networking/services/case';
import { useFormTabs } from '../hooks/useFormTabs';
import { useCase } from '../hooks/useCase';

// Make victim form schema with values from CreateVictimDTO using zod
const victimFormSchema = z.object({
  nombre: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  apellido: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Maximo 50 caracteres' }),
  genero: z.enum(['masculino', 'femenino', 'otro']).nullish(),
  fecha_nacimiento: z.string().nonempty('Requerido'),
  carnet_de_indentidad: z.string().max(20, { message: 'Maximo 20 caracteres' }),
  estudia: z.enum(['si', 'no']).nullish(),
  // Fix enum type
  unidad_educativa: z
    .nativeEnum(EducationInstitutions, {
      invalid_type_error: 'Invalido',
      required_error: 'Requirido',
    })
    .nullish(),
  direccion_unidad_educativa: z.string().max(50, {
    message: 'Maximo 50 caracteres',
  }),
  curso: z.nativeEnum(Course).nullish(),
  trabaja: z.enum(['si', 'no']).nullish(),
  lugar_trabajo: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  direccion_trabajo: z.string().max(50, {
    message: 'Maximo 50 caracteres',
  }),
  iglesia: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  numero_de_Casa_NNA: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  nombre_de_Calle_Avenida_NNA: z.string().max(50, {
    message: 'Maximo 50 caracteres',
  }),
  barrio_NNA: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  zona_NNA: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  municipio_NNA: z.string().max(50, { message: 'Maximo 50 caracteres' }),
  casa: z.nativeEnum(House).nullish(),
  telefono_fijo: z.string().max(10, { message: 'Maximo 10 caracteres' }),
  celular: z.string().max(10, { message: 'Maximo 10 caracteres' }),
  embarazada: z.enum(['si', 'no']).nullish(),
  semanas_de_embarazo: z.number().min(0).max(50).nullish(),
  padese_de_alguna_patologia: z.enum(['si', 'no']).nullish(),
  patologia: z.string().max(50, { message: 'Maximo 50 caracteres' }),
});

export function NNAForm() {
  const { handleSubmit, register, control, formState } =
    useForm<CreateVictimDTO>({
      resolver: zodResolver(victimFormSchema),
    });
  const { onNextTab } = useFormTabs();
  const { caseRequest, saveFirstMeeting, updateCase } = useCase();
  const toast = useToast();

  const { mutate: createVictimMutate } = useMutation(createVictim, {
    onSuccess: (response) => {
      updateCase({ victima_id: response.data.codigo_victima });
      onNextTab();
      toast({
        position: 'top',
        title: 'Niño o niña agregado correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        position: 'top',
        title: 'Error al agregar el niño o niña',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (values: CreateVictimDTO) => {
    if (!caseRequest.victima_id) {
      createVictimMutate(values);
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
        maxWidth="600px"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Niño o Niña afectado/a
        </Text>
        <Text color="gray" as="p">
          Ingrese toda la informacion del <Text as="ins">Niñ@ afectad@.</Text>
        </Text>
        <Divider />
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.nombre)}>
            <FormLabel>Nombre:</FormLabel>
            <Input
              placeholder="Ingrese su nombre"
              id="nombre"
              {...register('nombre')}
            />
            <FormErrorMessage>
              {formState.errors.nombre?.message || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formState.errors.apellido)}>
            <FormLabel>Appellido:</FormLabel>
            <Input
              placeholder="Ingrese su apellido"
              id="apellido"
              {...register('apellido')}
            />
            <FormErrorMessage>
              {formState.errors.apellido?.message || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.genero)}>
          <FormLabel>Genero:</FormLabel>
          <Select
            placeholder="Ingrese su genero"
            id="genero"
            {...register('genero')}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </Select>
          <FormErrorMessage>
            {formState.errors.genero?.message || 'Invalido'}
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
            {formState.errors.fecha_nacimiento?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.carnet_de_indentidad)}>
          <FormLabel>Carnet de Identidad:</FormLabel>
          <Input
            placeholder="Ingrese la identificación"
            id="carnet_de_indentidad"
            {...register('carnet_de_indentidad')}
          />
          <FormErrorMessage>
            {formState.errors.carnet_de_indentidad?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={Boolean(formState.errors.estudia)}>
          <FormLabel>Estudia:</FormLabel>
          <Controller
            name="estudia"
            control={control}
            render={({ field: { onChange, value } }) => (
              // @ts-expect-error type is not compatible with chakra-ui
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="si">Si</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {formState.errors.estudia?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.unidad_educativa)}>
          <FormLabel>Unidad Educativa:</FormLabel>
          <Select
            placeholder="Ingrese una unidad"
            id="unidad_educativa"
            {...register('unidad_educativa')}
          >
            {Object.values(EducationInstitutions).map((institution) => (
              <option key={institution} value={institution}>
                {institution}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {formState.errors.unidad_educativa?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formState.errors.direccion_unidad_educativa)}
        >
          <FormLabel>Direccion Unidad Educativa:</FormLabel>
          <Input
            placeholder="Ingrese direcion de unidad educativa"
            id="direccion_unidad_educativa"
            {...register('direccion_unidad_educativa')}
          />
          <FormErrorMessage>
            {formState.errors.direccion_unidad_educativa?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.curso)}>
          <FormLabel>Curso:</FormLabel>
          <Select
            placeholder="Ingrese un curso"
            id="curso"
            {...register('curso')}
          >
            {Object.values(Course).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {formState.errors.curso?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={Boolean(formState.errors.trabaja)}>
          <FormLabel>Trabaja:</FormLabel>
          <Controller
            name="trabaja"
            control={control}
            render={({ field: { onChange, value } }) => (
              // @ts-expect-error type is not compatible with chakra-ui
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="si">Si</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {formState.errors.trabaja?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.lugar_trabajo)}>
          <FormLabel>Lugar de trabajo:</FormLabel>
          <Input
            placeholder="Ingrese lugar de trabajo"
            id="lugar_trabajo"
            {...register('lugar_trabajo')}
          />
          <FormErrorMessage>
            {formState.errors.lugar_trabajo?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.direccion_trabajo)}>
          <FormLabel>Dirección de trabajo:</FormLabel>
          <Input
            placeholder="Ingrese dirección"
            id="direccion_trabajo"
            {...register('direccion_trabajo')}
          />
          <FormErrorMessage>
            {formState.errors.direccion_trabajo?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={Boolean(formState.errors.iglesia)}>
          <FormLabel>A que iglesia asiste:</FormLabel>
          <Input
            placeholder="Asiste a la iglesia"
            id="iglesia"
            {...register('iglesia')}
          />
          <FormErrorMessage>
            {formState.errors.iglesia?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.numero_de_Casa_NNA)}>
            <FormLabel>Numero de casa:</FormLabel>
            <Input
              placeholder="Ingrese su numero de casa"
              id="numero_de_Casa_NNA"
              {...register('numero_de_Casa_NNA')}
            />
            <FormErrorMessage>
              {String(formState.errors.numero_de_Casa_NNA?.message) ||
                'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(formState.errors.nombre_de_Calle_Avenida_NNA)}
          >
            <FormLabel>Nombre de Calle o Avenida:</FormLabel>
            <Input
              placeholder="Ingrese su calle"
              id="nombre_de_Calle_Avenida_NNA"
              {...register('nombre_de_Calle_Avenida_NNA')}
            />
            <FormErrorMessage>
              {String(formState.errors.nombre_de_Calle_Avenida_NNA?.message) ||
                'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.barrio_NNA)}>
          <FormLabel>Barrio:</FormLabel>
          <Input
            placeholder="Ingrese su barrio"
            id="barrio"
            {...register('barrio_NNA')}
          />
          <FormErrorMessage>
            {String(formState.errors.barrio_NNA?.message) || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <HStack>
          <FormControl isInvalid={Boolean(formState.errors.zona_NNA)}>
            <FormLabel>Zona:</FormLabel>
            <Input
              placeholder="Ingrese su zona"
              id="zona_NNA"
              {...register('zona_NNA')}
            />
            <FormErrorMessage>
              {String(formState.errors.zona_NNA?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formState.errors.municipio_NNA)}>
            <FormLabel>Municipio:</FormLabel>
            <Input
              placeholder="Ingrese su municipio"
              id="municipio_NNA"
              {...register('municipio_NNA')}
            />
            <FormErrorMessage>
              {String(formState.errors.municipio_NNA?.message) || 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.casa)}>
          <FormLabel>Casa:</FormLabel>
          <Controller
            name="casa"
            control={control}
            render={({ field: { onChange, value } }) => (
              // @ts-expect-error type is not compatible with chakra-ui
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  {Object.values(House).map((house) => (
                    <Radio key={house} value={house}>
                      {house}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {formState.errors.casa?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        {/* <FormControl>
          <FormLabel>Otro:</FormLabel>
          <Input
            placeholder="Ingrese otra información"
            id="other_info"
            {...register('other_info')}
          />
        </FormControl> */}
        <FormControl isInvalid={Boolean(formState.errors.telefono_fijo)}>
          <FormLabel>Telefono fijo:</FormLabel>
          <Input
            placeholder="Ingrese telefono fijo"
            id="telefono_fijo"
            {...register('telefono_fijo')}
          />
          <FormErrorMessage>
            {formState.errors.telefono_fijo?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.celular)}>
          <FormLabel>Telefono celular:</FormLabel>
          <Input
            placeholder="Ingrese telefono celular"
            id="celular"
            {...register('celular')}
          />
          <FormErrorMessage>
            {formState.errors.celular?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={Boolean(formState.errors.embaraza)}>
          <FormLabel>Embarazo:</FormLabel>
          <Controller
            name="embaraza"
            control={control}
            render={({ field: { onChange, value } }) => (
              // @ts-expect-error type is not compatible with chakra-ui
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="si">Si</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {formState.errors.embaraza?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.semanas_de_embarazo)}>
          {/* <FormLabel>Tiempo de embarazo (en semanas):</FormLabel>
          <Input
            placeholder="Ingrese tiempo de embarazo"
            id="semanas_de_embarazo"
            {...register('semanas_de_embarazo')}
          /> */}
          <FormLabel>Tiempo de embarazo (en semanas):</FormLabel>
          <NumberInput>
            <NumberInputField
              id="semanas_de_embarazo"
              // NOTE: native input returns string value (see issue https://github.com/orgs/react-hook-form/discussions/7128)
              {...register('semanas_de_embarazo', {
                setValueAs: (value) => {
                  return value === '' ? undefined : parseInt(value, 10);
                },
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {formState.errors.semanas_de_embarazo?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formState.errors.padese_de_alguna_patologia)}
        >
          <FormLabel>Padesede alguna patologia:</FormLabel>
          <Controller
            name="padese_de_alguna_patologia"
            control={control}
            render={({ field: { onChange, value } }) => (
              // @ts-expect-error type is not compatible with chakra-ui
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="si">Si</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {formState.errors.padese_de_alguna_patologia?.message || 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.patologia)}>
          <FormLabel>Patologia:</FormLabel>
          <Input
            placeholder="Ingrese patologia"
            id="patologia"
            {...register('patologia')}
          />
          <FormErrorMessage>
            {formState.errors.patologia?.message || 'Invalido'}
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
