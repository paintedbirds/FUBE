import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Select,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useFormTabs } from '../hooks/useFormTabs';

export function NNAForm() {
  const { handleSubmit, register, control } = useForm({ mode: 'onBlur' });
  const { onNextTab } = useFormTabs();

  const onSubmit = (values: Record<string, string>) => {
    console.log(values);
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
          Niño o Niña afectado/a
        </Text>
        <Text color="gray" as="p">
          Ingrese toda la informacion del <Text as="ins">Niñ@ afectad@.</Text>
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
          <FormLabel>Genero:</FormLabel>
          <Select
            placeholder="Ingrese su genero"
            id="genere"
            {...register('derived_by')}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </Select>
        </FormControl>
        <HStack>
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
        </HStack>
        <FormControl>
          <FormLabel>Identificación:</FormLabel>
          <Input
            placeholder="Ingrese la identificación"
            id="identification"
            {...register('identification')}
          />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Estudia:</FormLabel>
          <Controller
            name="study"
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
          <FormLabel>Unidad Educativa:</FormLabel>
          <Input
            placeholder="Ingrese una unidad"
            id="school"
            {...register('school')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Direccion Unidad Educativa:</FormLabel>
          <Input
            placeholder="Ingrese direcion de unidad educativa"
            id="school_address"
            {...register('school_address')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Curso:</FormLabel>
          <Input
            placeholder="Ingrese curso actual"
            id="relationship_with_kid"
            {...register('relationship_with_kid')}
          />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Trabaja:</FormLabel>
          <Controller
            name="work"
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
          <FormLabel>Dirección de trabajo:</FormLabel>
          <Input
            placeholder="Ingrese dirección"
            id="work_address"
            {...register('work_address')}
          />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>A que iglesia asiste:</FormLabel>
          <Input
            placeholder="Asiste a la iglesia"
            id="church_address"
            {...register('church_address')}
          />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Con quien vive actualmente:</FormLabel>
          <Input
            placeholder="Vive con..."
            id="housemates"
            {...register('housemates')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Domicilio del NNA:</FormLabel>
          <Input
            placeholder="Ingrese su domicilio"
            id="address"
            {...register('address')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Casa:</FormLabel>
          <Controller
            name="house_type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row" gap="30px">
                  <Radio value="Propia">Propia</Radio>
                  <Radio value="Antricretico">Antricretico</Radio>
                  <Radio value="Alquilado">Alquilado</Radio>
                  <Radio value="Cedido">Cedido</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Otro:</FormLabel>
          <Input
            placeholder="Ingrese otra información"
            id="other_info"
            {...register('other_info')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Telefono fijo:</FormLabel>
          <Input
            placeholder="Ingrese telefono fijo"
            id="telephone"
            {...register('telephone')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Telefono celular:</FormLabel>
          <Input
            placeholder="Ingrese telefono celular"
            id="cellphone"
            {...register('cellphone')}
          />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Embarazo:</FormLabel>
          <Controller
            name="pregnancy"
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
          <FormLabel>Tiempo de embarazo:</FormLabel>
          <Input
            placeholder="Ingrese tiempo de embarazo"
            id="pregnancy_time"
            {...register('pregnancy_time')}
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
