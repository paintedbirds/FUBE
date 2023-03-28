import { useForm, Controller, useController } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useFormTabs } from '../hooks/useFormTabs';
import { useRef } from 'react';

export function AggressorForm() {
  const { handleSubmit, register, control } = useForm({ mode: 'onBlur' });
  const { onNextTab } = useFormTabs();

  const onSubmit = (values: Record<string, string>) => {
    console.log(values);
  };

  const handleNextStep = () => {
    // TODO: save values into a context before show next tab (maybe send it to the database)
    onNextTab();
  };

  const fileRef = useRef<HTMLInputElement>(null);

  const {
    field: { ref, value, ...inputProps },
  } = useController({ control, name: 'file' });

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
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Input
              placeholder="Ingrese su nombre"
              id="first_name"
              {...register('first_name')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Appellido:</FormLabel>
            <Input
              placeholder="Ingrese su apellido"
              id="last_name"
              {...register('first_name')}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Relacion con NNA:</FormLabel>
          <Input
            placeholder="Ingrese la relación con NNA"
            id="relationship_with_kid"
            {...register('relationship_with_kid')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha de nacimiento:</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>Edad:</FormLabel>
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Escolaridad:</FormLabel>
          <Input
            placeholder="Ingrese su escolaridad"
            id="scholarship"
            {...register('scholarship')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Reincidente:</FormLabel>
          <Controller
            name="repeater"
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
        </FormControl>
        <FormControl>
          <FormLabel>Imputabilidad:</FormLabel>
          <Controller
            name="imputability"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack gap="10px">
                  <Radio value="Imputable">Imputable</Radio>
                  <Radio value="Con responsabilidad penal">
                    Con responsabilidad penal
                  </Radio>
                  <Radio value="Sin responsabilidad penal">
                    Sin responsabilidad penal
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tipo de delito:</FormLabel>
          <Controller
            name="type_of_crime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack gap="10px">
                  <Radio value="Violacion NNA">Violacion NNA</Radio>
                  <Radio value="Violacion">Violacion</Radio>
                  <Radio value="Abuso sexual">Abuso sexual</Radio>
                  <Radio value="Sospecha">Sospecha</Radio>
                  <Radio value="Estrupo">Estrupo</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Otros:</FormLabel>
          <Input
            placeholder="Ingrese otra información"
            id="other_info"
            {...register('other_info')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Referido por:</FormLabel>
          <Input
            placeholder="Por quien es referido"
            id="referred_by"
            {...register('referred_by')}
          />
        </FormControl>
        <FormControl>
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
        </FormControl>
        <FormControl>
          <FormLabel>Observaciones:</FormLabel>
          <Textarea
            placeholder="Observaciones conseguidas..."
            id="observations"
            {...register('observations')}
          />
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
