import { useForm } from 'react-hook-form';

const CrudForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CrudForm;
