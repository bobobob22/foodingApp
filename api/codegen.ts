import { generate } from 'openapi-typescript-codegen'

generate({
  input: './swagger.json',
  output: './api',
})
