import { Box, Text } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface FormProps {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: FieldValues;
  children: React.ReactNode;
}

export function Form({ onSubmit, defaultValues, children }: FormProps) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ defaultValues });

  const submitHandler = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      setError('general', {
        type: 'submit',
        message: 'Algo ha salido mal, revisa los campos.',
      });
    }
  });

  return (
    <Box as="form" onSubmit={submitHandler}>
      {children}
      {errors.general && (
        <Text color="red.900" marginBottom="4" borderRadius="md">
          {String(errors.root?.message)}
        </Text>
      )}
    </Box>
  );
}
