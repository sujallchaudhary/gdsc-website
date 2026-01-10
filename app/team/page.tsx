"use client";
import TeamCard from '@/components/TeamCard';
import Card from '@/components/Card';
import SectionLabel from '@/components/SectionLabel';
import DepartmentHeader from '@/components/DepartmentHeader';
import {LongTailArrowIcon} from '@/components/icons';
import { ASSET_PATHS } from '@/libs/utils';

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden pb-20 ">
      <img src='backg.png' className='absolute translate-y-60 -translate-x-10 w-[400%] h-[14%] lg:h-[20%] xl:h-[25%]' />
      <div className="m-5 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <header className="md:my-10 mb-10 mt-6">
        <div className="flex items-center gap-4 group cursor-pointer">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-text-black">Meet the Team</h1>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <LongTailArrowIcon className='md:w-[90px] md:h-[80px] w-12 h-12' />
          </div>
        </div>
        <p className="text-text-gray text-xs sm:text-sm uppercase tracking-[0.2em] font-bold md:mt-4">
          "TEAMWORK GIVES YOU THE BEST OPPORTUNITY TO TURN VISION INTO REALITY."
        </p>
        <p className='text-text-light-gray text-sm'>-John C. Maxwell</p>
      </header>

      {/* PRESIDENTS SECTION */}
      <section className="w-full lg:mb-16 flex items-center"> 
        <SectionLabel title="PRESIDENTS" color="blue" />
        <div className="w-full grid grid-cols-3  ">
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='blue' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='blue' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='blue' linkedinUrl="#" />
        </div>
      </section>

      {/* VICE PRESIDENTS SECTION */}
      <section className="w-full lg:mb-16 flex items-center">
        <SectionLabel title="VICE PRESIDENTS" color="yellow" />
        <div className="w-full grid grid-cols-3 ">
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='yellow' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='yellow' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='yellow' linkedinUrl="#" />
        </div>
      </section>

      {/* GENERAL SECRETARY SECTION */}
      <section className="w-full mb-16 flex items-center">
        <SectionLabel title="GENERAL SECRETARY" color="red" />
        <div className="w-full grid grid-cols-3 ">
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='red' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='red' linkedinUrl="#" />
          <Card name="Raghu Ram" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} tintColor='red' linkedinUrl="#" />
        </div>
      </section>

    </div>
      <hr className="text-black border mx-15" />

      {/* DEPARTMENT: DEVELOPMENT */}
      <div className="mt-10">
        <DepartmentHeader
          title="Development"
          leftIcon="/leftarrow.png"
          rightIcon="/rightarrow.png"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 mx-12 gap-12 mt-16 justify-items-center mb-12 relative">
          <TeamCard name="Raghu Ram" role="Department Lead" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Mentor" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
        </div>
      </div>
      <hr className="text-black border mx-15" />

      {/* DEPARTMENT: DSA */}
      <div className="mt-10">
        <DepartmentHeader
          title="DSA"
          leftIcon="/leftarrow.png"
          rightIcon="/rightarrow.png"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 mx-12 gap-12 mt-16 justify-items-center mb-12 relative">
          <TeamCard name="Raghu Ram" role="Department Lead" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Mentor" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
        </div>
      </div>
      <hr className="text-black border mx-15" />

      {/* DEPARTMENT: MACHINE LEARNING */}
      <div className="mt-10">
        <DepartmentHeader
          title="Machine Learning"
          leftIcon="/leftarrow.png"
          rightIcon="/rightarrow.png"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 mx-12 gap-12 mt-16 justify-items-center mb-12 relative">
          <TeamCard name="Raghu Ram" role="Department Lead" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Mentor" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
        </div>
      </div>
      <hr className="text-black border mx-15" />

      {/* DEPARTMENT: PRODUCTION */}
      <div className="mt-10 mb-20">
        <DepartmentHeader
          title="Production"
          leftIcon="/leftarrow.png"
          rightIcon="/rightarrow.png"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 mx-12 gap-12 mt-16 justify-items-center mb-12 relative">
          <TeamCard name="Raghu Ram" role="Department Lead" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Mentor" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
          <TeamCard name="Raghu Ram" role="Member" imageSrc={`${ASSET_PATHS.TEAMS}/raghu.png`} linkedinUrl="#" />
        </div>
      </div>
      <hr className="text-black border mx-15" />

    </main>
  );
}