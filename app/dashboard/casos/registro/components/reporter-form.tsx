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
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useFormTabs } from '../hooks/useFormTabs';
import { useMutation } from '@tanstack/react-query';
import { createReporter, CreateReporterDTO } from '@/networking/services/case';

export function ReporterForm() {
  const { handleSubmit, register } = useForm({ mode: 'onBlur' });
  const { onNextTab } = useFormTabs();

  const { mutate } = useMutation(createReporter);

  const onSubmit = (values: Record<string, string>) => {
    mutate(values as unknown as CreateReporterDTO);
  };

  const handleNextStep = () => {
    // TODO: save values into a context before show next tab (maybe send it to the database)
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
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Input
              placeholder="Ingrese su nombre"
              id="nombre"
              {...register('nombre')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Appellido:</FormLabel>
            <Input
              placeholder="Ingrese su apellido"
              id="apellido"
              {...register('apellido')}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Institución:</FormLabel>
          <Input
            placeholder="Ingrese su institucion"
            id="institucion"
            {...register('institucion')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Relacion con NNA:</FormLabel>
          <Input
            placeholder="Ingrese la relación con NNA"
            id="rrelacion_con_NNA"
            {...register('rrelacion_con_NNA')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Derivado por:</FormLabel>
          <Input
            placeholder="Ingrese la derivación del caso"
            id="derivado_por"
            {...register('derivado_por')}
          />
        </FormControl>
        {/* <FormControl>
          <FormLabel>Dirección:</FormLabel>
          <Input
            placeholder="Ingrese su dirección"
            id="address"
            {...register('address')}
          />
        </FormControl> */}
        <FormControl>
          <FormLabel>Telefono:</FormLabel>
          <Input
            placeholder="Ingrese su telefono"
            id="telefono"
            {...register('telefono')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Celular:</FormLabel>
          <Input
            placeholder="Ingrese su celular"
            id="celular"
            {...register('celular')}
          />
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
