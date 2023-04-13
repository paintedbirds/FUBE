import { useForm } from 'react-hook-form';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
  HStack,
  Button,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useFormTabs } from '../hooks/useFormTabs';
import { useCase } from '../hooks/useCase';
import { CreateReporterDTO } from '@/networking/services/case';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reportFormSchema = z.object({
  nombre: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  apellido: z
    .string()
    .nonempty('Requerido')
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
  institucion: z.string().max(50, { message: 'Cantidad maxima 50 caracteres' }),
  rrelacion_con_NNA: z.string(),
  derivado_por: z
    .string()
    .max(50, { message: 'Cantidad maxima 50 caracteres' }),
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
});

export function ReporterForm() {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(reportFormSchema),
  });

  const { onNextTab } = useFormTabs();
  const { updateCase, saveFirstMeeting } = useCase();

  const onSubmit = (values: Record<string, string>) => {
    updateCase({ denuncianteValues: values as unknown as CreateReporterDTO });
    saveFirstMeeting();
  };

  const handleNextStep = () => {
    onNextTab();
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
          Denunciante
        </Text>
        <Text color="gray" as="p">
          Ingrese toda la informacion del <Text as="ins">denunciante</Text>,
          todos los campos son opcionales.
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
              {String(formState.errors.nombre?.message) ?? 'Invalido'}
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
              {String(formState.errors.apellido?.message) ?? 'Invalido'}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(formState.errors.institucion)}>
          <FormLabel>Institución:</FormLabel>
          <Input
            placeholder="Ingrese su institucion"
            id="institucion"
            {...register('institucion')}
          />
          <FormErrorMessage>
            {String(formState.errors.institucion?.message) ?? 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.rrelacion_con_NNA)}>
          <FormLabel>Relacion con NNA:</FormLabel>
          <Select
            placeholder="Ingrese la relación con NNA"
            id="rrelacion_con_NNA"
            {...register('rrelacion_con_NNA')}
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
            {String(formState.errors.rrelacion_con_NNA?.message) ?? 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(formState.errors.derivado_por)}>
          <FormLabel>Derivado por:</FormLabel>
          <Input
            placeholder="Ingrese la derivación del caso"
            id="derivado_por"
            {...register('derivado_por')}
          />
          <FormErrorMessage>
            {String(formState.errors.derivado_por?.message) ?? 'Invalido'}
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
              {String(formState.errors.numero_de_Casa?.message) ?? 'Invalido'}
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
              {String(formState.errors.numero_de_Casa?.message) ?? 'Invalido'}
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
            {String(formState.errors.barrio?.message) ?? 'Invalido'}
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
              {String(formState.errors.zona?.message) ?? 'Invalido'}
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
              {String(formState.errors.municipio?.message) ?? 'Invalido'}
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
            {String(formState.errors.telefono?.message) ?? 'Invalido'}
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
            {String(formState.errors.celular?.message) ?? 'Invalido'}
          </FormErrorMessage>
        </FormControl>
        {/* <FormControl>
          <FormLabel>Denuncia/Hechos:</FormLabel>
          <Textarea
            placeholder="La denuncia es realizada porque..."
            id="report"
            {...register('report')}
          />
        </FormControl> */}
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
        <Button
          bg="#2843B2"
          color="white"
          px="24px"
          py="16px"
          height="60px"
          rightIcon={<ChevronRightIcon />}
          onClick={handleNextStep}
        >
          Continuar con el seguimiento
        </Button>
      </Box>
    </form>
  );
}
