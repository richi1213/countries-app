import { ActionFunctionArgs, redirect } from "react-router-dom";

export const contactAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const submission = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  console.log(submission);

  return redirect("/");
};
