'use client'
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard({ closeSidebar }) {
  const router = useRouter();
  const [active, setActive] = useState('Home');

  const menuItems = [
      {label:'Home', slug: 'main'},
    { label: 'Profile', slug: 'profile' },
        { label: 'About', slug: 'about' },      
    { label: 'Education', slug: 'education' },    
    { label: 'Skills', slug: 'skills' },
    { label: 'Projects', slug: 'projects' },
    { label: 'Publications', slug: 'publications' },
    { label: 'Experience', slug: 'experience' },
    { label: 'Award & Leaderships', slug: 'awards' },
    { label: 'Interests', slug: 'interest' },
    { label: 'Languages', slug: 'language' },
  ];

  const handleClick = (item) => {
    setActive(item.label);
    router.push(`/create/${item.slug}`);
    if (closeSidebar) closeSidebar(); 
  };

  return (
    <div className="bg-[#010912] w-[285px] h-full flex flex-col pt-4">
      <div className="flex justify-center items-center mb-4">
        <span className="text-neutral-400 font-bold">Dashboard</span>
      </div>

      <ul className="flex flex-col justify-start pl-6 gap-[15px] pb-12 pt-8">
        {menuItems.map((item) => (
          <li
            key={item.slug}
            onClick={() => handleClick(item)}
            className={clsx({
              'text-neutral-400': active !== item.label,
              'text-white': active === item.label,
              'cursor-pointer': true,
            })}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}


