import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import type { SubmitEvent } from "react";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

// helper untuk membantu mendapat string dari form
function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3 className="font-pacifico text-secondary text-center m-12.5 font-normal text-[30px]">
          Submitted!
        </h3>
      ) : (
        <form
          onSubmit={mutation.mutate}
          className="flex flex-col items-center justify-center"
        >
          <input
            name="name"
            placeholder="Name"
            className="max-w-125 w-full outline-none p-2 border-2 border-border rounded-[5px] my-3.75 focus:border-primary disabled:bg-[#999]"
          />
          <input
            className="max-w-125 w-full outline-none p-2 border-2 border-border rounded-[5px] my-3.75 focus:border-primary disabled:bg-[#999]"
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className="max-w-125 w-full outline-none p-2 border-2 border-border rounded-[5px] my-3.75 min-h-50 focus:border-primary"
            placeholder="Message"
            name="message"
          ></textarea>
          <button className="btn">Submit</button>
        </form>
      )}
    </div>
  );
}
