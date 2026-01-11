'use client';

import { PageHero } from "@/components/events";
import { SendIcon } from "@/components/icons";
import { Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/app/actions/contact";
import { contactFormSchema, type ContactFormData } from "@/libs/validations/contact";
import { cn } from "@/libs/utils";

const Contact = () => {
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus({ type: "loading", message: "Sending..." });

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        reset();
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between lg:px-20 px-10 md:py-10 pt-6 pb-0">
        <div>
          <PageHero
            title="Let's make"
            iconClassName="text-primary-green"
            containerClassName="mb-0 md:mb-0"
            titleClassName=" sm:text-5xl"
          />
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight text-text-black font-neue-montreal">
            something <span className="text-primary-blue">creative</span>
          </h1>

          <div className="flex items-center md:gap-4 gap-2 md:my-8 sm:mt-4 sm:mb-8 mt-3 mb-5">
            <h2 className="font-neue-montreal text-[26px] sm:text-4xl lg:text-5xl text-text-black font-medium">
              Contact Us
            </h2>
            <SendIcon className={"w-7 h-7 md:w-[50px] md:h-[50px]"} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                disabled={isSubmitting}
                className="block border border-[#656C73] rounded-md py-1.5 px-3 text-text-gray placeholder:text-text-gray w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                disabled={isSubmitting}
                className="block border border-[#656C73] rounded-md py-1.5 px-3 text-text-gray placeholder:text-text-gray w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Message (optional)"
                {...register("message")}
                disabled={isSubmitting}
                rows={4}
                className="block border border-[#656C73] rounded-md py-1.5 px-3 text-text-gray placeholder:text-text-gray w-[250px] disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-blue text-white px-5 py-2 rounded-md flex items-center gap-2 text-md my-3 hover:-translate-y-0.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Sending..." : "Send"}
              <Send size={18} />
            </button>
          </form>

          {status.message && status.type != 'loading' && (
            <div
              className={cn(
                "mt-4 p-3 rounded-md max-w-[350px]",
                status.type === "success" && "bg-green-100 text-green-800 border border-green-300",
                status.type === "error" && "bg-red-100 text-red-800 border border-red-300"
              )}
            >
              {status.message}
            </div>
          )}

          <p className="max-w-[350px] text-text-black font-product-sans text-lg mt-10 mb-5">
            Netaji Subhas University of Technology, Azad Hind Fauj Marg, Dwarka
            Sector-3, Dwarka, Delhi, 110078, India
          </p>
        </div>
        <div>
          <Image
            src="/contact-image.png"
            width={500}
            height={500}
            className="absolute top-0 xl:right-20 right-0 hidden md:block md:w-[400px] lg:w-[500px]"
            alt="Contact Illustration"
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
