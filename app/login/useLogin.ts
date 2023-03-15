import { useMutation } from '@tanstack/react-query'

import { login } from '@/networking/services/login'

export const useLogin = () => {
  return useMutation(login)
}
