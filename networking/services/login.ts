import { httpClient } from '../http-client'

interface LoginRequestDto {
  username: string
  password: string
}

interface LoginResponseDto {
  token: string
  model_perms: string[]
  group_names: string[]
}

export const login = (credentialsDto: LoginRequestDto) => {
  return httpClient.post<LoginResponseDto>('/login', credentialsDto)
}
