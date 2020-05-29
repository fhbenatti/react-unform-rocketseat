import React, {useRef, useEffect, useState} from 'react'
import {Form} from '@unform/web'
import {Scope} from '@unform/core'
import './App.css'
import Input from './components/Form/Input'
import * as Yup from 'yup'

const initialData = {
  email: 'fhbenatti@gmail.com',
  address: {
    city: 'Piracicaba',
    number: 99,
  },
}

function App() {
  const [user, setUser] = useState({})
  const formRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {}, 2000)
  })

  async function handleSubmit(data, {reset}) {
    // if (data.name === '') {
    //   // formRef.current.setFieldError('name', 'O nome é obrigatório')
    //   formRef.current.setErrors({
    //     name: 'O nome é obrigatório',
    //   })
    // }

    // if (data.address.city === '') {
    //   formRef.current.setFieldError('address.city', 'A cidade é obrigatória')
    // }

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigaória'),
        }),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data)

      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {}

        error.inner.forEach((error) => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        {/* <Input type="email" name="email" /> */}
        <Input name="email" />

        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <Input type="password" name="password" />

        <button type="submit">Enviar</button>
      </Form>
    </div>
  )
}

export default App
