import client from "@/lib/client";
import { FullSessionFormValues } from "@/lib/validations";
import { InferResponseType } from "hono";
import { UseFormReturn } from "react-hook-form";

type Students = InferResponseType<
  (typeof client.api.personal)["students-session"]["$get"]
>["data"];

type Props = {
  form: UseFormReturn<FullSessionFormValues>;
  students: Students;
};

export const Step1FormSession = ({ form, students }: Props) => {
  const {} = form;

  return <div>Step1FormSession</div>;
};
