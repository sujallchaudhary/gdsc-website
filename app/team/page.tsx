"use client";
import React, { useMemo } from 'react';
import TeamCard from '@/components/TeamCard';
import Card from '@/components/Card';
import SectionLabel from '@/components/SectionLabel';
import DepartmentHeader from '@/components/DepartmentHeader';
import { LongTailArrowIcon } from '@/components/icons';
import { ASSET_PATHS } from '@/libs/utils';
import membersData from '@/data/members.json';

// Define the Member interface matching the JSON structure
interface Member {
  timestamp: string;
  name: string;
  department: string;
  position: string;
  corePosition: string;
  rollNumber: string;
  nsutEmail: string;
  personalEmail: string;
  linkedin: string;
  github: string;
  bio: string;
  image: string;
}

const MEMBERS = membersData as Member[];

export default function TeamPage() {
  // Use useMemo to process data only once
  const { presidents, vicePresidents, generalSecretaries, departments } = useMemo(() => {
    // 1. Core Positions Filtering
    // Filter by position "Core" or corePosition field, but user specifically asked for Presi, VP, GenSec at top.

    // Normalizing strings for comparison
    const normalize = (s: string) => s.trim().toLowerCase();

    const presidents = MEMBERS.filter(m => m.corePosition && normalize(m.corePosition) === 'president');
    const vicePresidents = MEMBERS.filter(m => m.corePosition && normalize(m.corePosition) === 'vice president');
    const generalSecretaries = MEMBERS.filter(m => m.corePosition && normalize(m.corePosition) === 'general secretary');

    // IDs of people already shown in top sections to exclude them from departments if needed
    // Assuming they should NOT appear in departments if they are listed above? 
    // Usually Presi/VP are not in a specific "dept" list or are separate.
    // Let's collect their rollNumbers or unique IDs to exclude.
    const featuredRolls = new Set([
      ...presidents, ...vicePresidents, ...generalSecretaries
    ].map(m => m.rollNumber));

    // 2. Department Grouping
    const deptMap: Record<string, Member[]> = {};

    MEMBERS.forEach(member => {
      // Skip if already visually featured at top
      if (featuredRolls.has(member.rollNumber)) return;

      const dept = member.department ? member.department.trim() : 'Other';
      if (!deptMap[dept]) {
        deptMap[dept] = [];
      }
      deptMap[dept].push(member);
    });

    // 3. Sorting within Departments
    // Order: Department Lead (Core) -> Mentor -> Member
    // Note: User said "Department Lead (Core)". In the CSV, we have "Position" and "Core Position".
    // "Core" position usually implies Department Lead or similar if in a department.
    // Explicit Sort Order weights:
    const getWeight = (member: Member) => {
      const pos = normalize(member.position);
      const corePos = normalize(member.corePosition);

      // Check for "Head" or "Lead" in corePosition if position is Core
      if (pos === 'core' || corePos.includes('head') || corePos.includes('lead')) return 0; // Highest priority
      if (pos === 'mentor') return 1;
      if (pos === 'member') return 2;
      return 3; // Others
    };

    Object.keys(deptMap).forEach(dept => {
      deptMap[dept].sort((a, b) => {
        const weightA = getWeight(a);
        const weightB = getWeight(b);
        if (weightA !== weightB) return weightA - weightB;
        // Secondary sort by name?
        return a.name.localeCompare(b.name);
      });
    });

    // Departments to display in specific order if desired, or just all keys
    // Common order: Technical depts, then others? Or just alphabetical?
    // User didn't specify department order. Let's list known ones first or just alphabetical.
    // Known: Development, DSA, ML, Production, Operations
    // We can just iterate Object.keys(deptMap) but order is not guaranteed. 
    // Let's sort keys to be consistent.
    const sortedDeptKeys = Object.keys(deptMap).sort();

    return {
      presidents,
      vicePresidents,
      generalSecretaries,
      departments: sortedDeptKeys.map(key => ({ name: key, members: deptMap[key] }))
    };
  }, []);

  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden pb-20 ">
      <img src='backg.png' className='absolute translate-y-60 -translate-x-10 w-[400%] h-[14%] lg:h-[20%] xl:h-[25%] pointer-events-none select-none' alt="background" />
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
            &quot;TEAMWORK GIVES YOU THE BEST OPPORTUNITY TO TURN VISION INTO REALITY.&quot;
          </p>
          <p className='text-text-light-gray text-sm'>-John C. Maxwell</p>
        </header>

        {/* PRESIDENTS SECTION */}
        {presidents.length > 0 && (
          <section className="w-full lg:mb-16 flex items-center">
            <SectionLabel title="PRESIDENT" color="blue" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {presidents.map((member, idx) => (
                <Card
                  key={idx}
                  name={member.name}
                  imageSrc={`/${member.image}`}
                  tintColor='blue'
                  linkedinUrl={member.linkedin}
                />
              ))}
            </div>
          </section>
        )}

        {/* VICE PRESIDENTS SECTION */}
        {vicePresidents.length > 0 && (
          <section className="w-full lg:mb-16 flex items-center">
            <SectionLabel title="VICE PRESIDENT" color="yellow" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {vicePresidents.map((member, idx) => (
                <Card
                  key={idx}
                  name={member.name}
                  imageSrc={`/${member.image}`}
                  tintColor='yellow'
                  linkedinUrl={member.linkedin}
                />
              ))}
            </div>
          </section>
        )}

        {/* GENERAL SECRETARY SECTION */}
        {generalSecretaries.length > 0 && (
          <section className="w-full mb-16 flex items-center">
            <SectionLabel title="GENERAL SECRETARY" color="red" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {generalSecretaries.map((member, idx) => (
                <Card
                  key={idx}
                  name={member.name}
                  imageSrc={`/${member.image}`}
                  tintColor='red'
                  linkedinUrl={member.linkedin}
                />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* DEPARTMENTS */}
      {departments.map((dept, index) => (
        <React.Fragment key={dept.name}>
          <hr className="text-black border mx-15" />
          <div className="mt-10 mb-20 last:mb-0">
            <DepartmentHeader
              title={dept.name}
              leftIcon="/leftarrow.png"
              rightIcon="/rightarrow.png"
            />
            {/* 
               Grid Layout:
               - On Large screens: 4 cols
               - On Medium: 2 cols
               - Centered
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-6 lg:mx-12 gap-8 lg:gap-12 mt-16 justify-items-center relative">
              {dept.members.map((member, mIdx) => (
                <TeamCard
                  key={mIdx}
                  name={member.name}
                  role={member.corePosition || member.position}
                  imageSrc={`/${member.image}`}
                  linkedinUrl={member.linkedin}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}

      <hr className="text-black border mx-15" />

    </main>
  );
}