import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'design-system/Button';

const CrudForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CrudForm;
