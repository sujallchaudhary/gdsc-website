import Image1 from "@/public/images/home-22.svg";
import Star from "@/public/images/home-23.svg";
import Cloud from "@/public/images/home-24.svg";
import Image2 from "@/public/images/home-25.svg";
import Image3 from "@/public/images/home-26.svg";
import Image4 from "@/public/images/home-27.svg";
import Image5 from "@/public/images/home-28.svg";
import Cloud2 from "@/public/images/home-29.svg";
import { motion } from "framer-motion";
import Image from "next/image";

const HomeCards = () => {
  const slideLeftVariant = {
    hidden: { x: -200 },
    visible: { x: 0 },
  };

  const slideRightVariant = {
    hidden: { x: 200 },
    visible: { x: 0 },
  };

  return (
    <section
      className="
      relative pt-10 lg:pt-14
      bg-[#333]
      bg-[linear-gradient(to_right,#777_1px,transparent_1px),linear-gradient(to_bottom,#777_1px,transparent_1px)]
      lg:bg-[linear-gradient(to_right,#777_2px,transparent_2px),linear-gradient(to_bottom,#777_2px,transparent_2px)]
      bg-size-[calc(100vw/17)_calc(100vw/17)]
      lg:bg-size-[calc(100vw/28)_calc(100vw/28)]
      overflow-hidden
    "
    >
      {/* Blur boxes */}
      <div className="w-full h-40 bg-[#333] absolute z-2 top-0" />
      <div className="w-full h-30 absolute z-1 top-40 bg-[linear-gradient(180deg,#333333_0%,rgba(51,51,51,0.966838)_16.94%,rgba(51,51,51,0.592051)_35.41%,rgba(51,51,51,0)_90.36%)]" />
      <div className="rounded-full hidden lg:block w-500 h-500 absolute top-60 -translate-y-1/2 right-0 blur-3xl translate-x-1/2 z-1 bg-[radial-gradient(circle,rgba(51,51,51,0.9)_0%,rgba(51,51,51,0.5)_40%,rgba(51,51,51,0.3)_70%,rgba(51,51,51,0)_100%)]" />
      <div className="absolute h-full w-10 top-0 left-0 bg-linear-to-r from-[#333] to-transparent" />
      <div className="blur-3xl rounded-full hidden lg:block w-500 -translate-x-1/2 translate-y-1/2 h-500 absolute bottom-0 left-0 z-1 bg-[radial-gradient(circle,rgba(51,51,51,0.9)_0%,rgba(51,51,51,0.5)_40%,rgba(51,51,51,0.3)_70%,rgba(51,51,51,0)_100%)]" />

      <h1 className="relative z-2 text-3xl lg:text-[50px] text-white ml-10 lg:ml-27 font-medium">
        What we do here at GDG NSUT
      </h1>

      <div className="relative">
        {/* Card 1 */}
        <div className="relative pt-15 lg:pt-12">
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 16,
              mass: 0.9,
            }}
          >
            <div
              className={`shadow-[0px_4px_30px_5px_#0000004D] z-3 ml-7 lg:ml-20 rounded-[25px] lg:rounded-[40px] relative flex justify-center items-center lg:block min-h-60 lg:h-[60vh] w-[80vw] lg:w-[60vw] mx-auto bg-[url('/images/home-21.png')] bg-cover bg-center overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-black/0" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/0" />

              <div className="text-white lg:absolute lg:bottom-0 lg:left-0 my-10 mx-13 lg:mx-15 lg:my-15 z-4">
                <h2 className="text-3xl lg:text-5xl font-medium mb-3.5 lg:mb-6">
                  Design
                </h2>
                <p className="text-base lg:text-3xl font-normal leading-tight">
                  We design state of the art websites and applications keeping
                  the User Experience and User Interface in mind. Our designing
                  department consists of some of the best talent across the
                  campus.
                </p>
              </div>
            </div>
          </motion.div>
          <Image
            src={Star}
            width={400}
            height={400}
            alt=""
            className="hidden lg:block absolute -bottom-32 z-2 -left-15 w-50 h-auto"
          />
          <Image
            src={Image2}
            width={400}
            height={400}
            alt=""
            className="absolute -bottom-14 z-2 -right-2 w-[20vw] h-auto lg:hidden"
          />
          <Image
            src={Image1}
            alt=""
            width={670}
            height={500}
            className="hidden xl:block absolute z-1 w-[32vw] right-0 top-[60%] -translate-y-[60%]"
          />
          <Image
            src={Image5}
            alt=""
            width={670}
            height={500}
            className="hidden xl:block absolute z-3 w-[35vw] right-[10vw] top-[40%]"
          />
        </div>

        {/* Card 2 */}
        <div className="relative pt-8 flex justify-end">
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 16,
              mass: 0.9,
              delay: 0.1,
            }}
          >
            <div
              className={`text-right shadow-[0px_4px_30px_5px_#0000004D] z-4 rounded-[25px] lg:rounded-[40px] relative flex justify-center items-center lg:block min-h-60 lg:h-[60vh] mr-7 w-[80vw] lg:w-[60vw] lg:mr-20 bg-[url('/images/home-21.png')] bg-cover bg-center overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-l from-black/90 via-black/40 to-black/0" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/0" />

              <div className="text-white lg:absolute lg:bottom-0 lg:left-0 my-10 mx-13 lg:mx-15 lg:my-15 z-4">
                <h2 className="text-3xl lg:text-5xl font-medium mb-3.5 lg:mb-6">
                  Code
                </h2>
                <p className="text-base lg:text-3xl font-normal leading-tight">
                  We are one of the biggest developer student clubs across the
                  country. All coding departments will give you the opportunity
                  to interact and learn from experienced developers.
                </p>
              </div>
            </div>
          </motion.div>
          <Image
            src={Cloud}
            width={400}
            height={400}
            alt=""
            className="hidden lg:block absolute z-1 right-0 top-1/2 w-50 -translate-y-[145%]"
          />
          <Image
            src={Star}
            width={400}
            height={400}
            alt=""
            className="absolute top-0 -left-12 w-[28vw] h-auto lg:hidden"
          />
          <Image
            src={Cloud2}
            width={400}
            height={400}
            alt=""
            className="absolute -bottom-[14vw] -scale-x-100 right-2 z-3 w-[20vw] h-auto lg:hidden"
          />
          <Image
            src={Image2}
            alt=""
            width={670}
            height={500}
            className="hidden lg:block absolute z-1 w-[18vw] left-[10vw] top-[30%]"
          />
        </div>

        {/* Card 3 */}
        <div className="relative pt-8 pb-20">
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 16,
              mass: 0.9,
              delay: 0.2,
            }}
          >
            <div
              className={`shadow-[0px_4px_30px_5px_#0000004D] z-4 ml-7 lg:ml-20 rounded-[25px] lg:rounded-[40px] relative flex justify-center items-center lg:block min-h-60 lg:h-[60vh] w-[80vw] lg:w-[60vw] mx-auto bg-[url('/images/home-21.png')] bg-cover bg-center overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-black/0" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/0" />

              <div className="text-white lg:absolute lg:bottom-0 lg:left-0 my-10 mx-13 lg:mx-15 lg:my-15 z-4">
                <h2 className="text-3xl lg:text-5xl font-medium mb-3.5 lg:mb-6">
                  Develop
                </h2>
                <p className="text-base lg:text-3xl font-normal leading-tight">
                  We develop industry standard applications be it the society
                  website, social services, hackathons etc. DSC will provide you
                  with the best environment for learning and teaching
                  development skills.
                </p>
              </div>
            </div>
          </motion.div>
          <Image
            src={Image3}
            width={400}
            height={400}
            alt=""
            className="hidden z-3 lg:block absolute -top-7 right-[19%] w-[20vw] h-auto"
          />
          <Image
            src={Image4}
            width={400}
            height={400}
            alt=""
            className="hidden z-3 lg:block absolute top-[35%] right-[3vw] w-[28vw] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
