import { PageHero } from "@/components/events";
import { SendIcon } from "@/components/icons";
import { Send } from "lucide-react";
import Image from "next/image";
import React from "react";

const Contact = () => {
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

          <input
            type="text"
            placeholder="Name"
            className="block border border-[#656C73] rounded-md py-1.5 px-3 text-text-gray placeholder:text-text-gray w-[250px] mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            className="block border border-[#656C73] rounded-md py-1.5 px-3 text-text-gray placeholder:text-text-gray w-[250px]"
          />
          <button className="bg-primary-blue text-white px-5 py-2 rounded-md flex items-center gap-2 text-md my-3 hover:-translate-y-0.5 transition cursor-pointer">
            Send
            <Send size={18} />
          </button>

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
