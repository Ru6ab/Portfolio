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
    if (closeSidebar) closeSidebar(); // closes mobile sidebar
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



// 'use client'
// import clsx from "clsx";
// import Image from "next/image";
// import { IoLogoTwitter } from "react-icons/io";
// import { FaFacebookF } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { useState } from "react";

// export default function SideNav({data}) {
//      const [active, setActive] = useState("Home");

//   const menuItems = [
//     "Home",
//     "About",
//     "Education",
//     "Skills",
//     "Projects",
//     "Publications",
//     "Award & Leaderships",
//     "Languages & Interests",
//   ];
//   return (

//     <div className="bg-[#010912] w-[285px]   flex flex-col z-20  pt-4 ">
//         <div className="flex flex-col   items-center">
//       <div className="bg-[#212731] p-2 rounded-full">
//         <Image
//           src="/assets/placeholderImg.jpg"
//           alt="img"
//           width={110}
//           height={110}
//           className="rounded-full bg-[#212529]"
//         />
//       </div>

//       <span>
//         <h1 className="font-bold text-[23px] my-3 text-white">Rubab</h1>
//       </span>
//       <div className="flex flex-row gap-2">
//         <IoLogoTwitter
//           className="text-white bg-[#212731]  rounded-full p-2 text-[]"
//           fontSize={33}
//         />
//         <FaFacebookF
//           className="text-white bg-[#212731]  rounded-full p-2 text-[]"
//           fontSize={33}
//         />
//         <FaGithub
//           className="text-white bg-[#212731]  rounded-full p-2 text-[]"
//           fontSize={33}
//         />
//         <FaLinkedinIn
//           className="text-white bg-[#212731]  rounded-full p-2 text-[]"
//           fontSize={33}
//         />
//       </div>
//       </div>
      
      
//       <ul className="mt-8 flex flex-col justify-start  pl-8 gap-[15px] pb-12">
//        {menuItems.map((item)=>(
//        <a href={`#${item}`} key={item}  onClick={()=>setActive(item)}><li className={clsx({'text-neutral-400' : active!==item, "text-white": active===item})}>{item}</li></a>
//        ))}
//     </ul>
//     </div>
//   );
// }
// 'use client'
// import clsx from "clsx";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();
//   const [active, setActive] = useState("Home");

//   const menuItems = [
//     { label: "Profile", slug: "profile" },
//     { label: "Home", slug: "home" },
//     { label: "About", slug: "about" },
//     { label: "Education", slug: "education" },
//     { label: "Skills", slug: "skills" },
//     { label: "Projects", slug: "projects" },
//     { label: "Publications", slug: "publications" },
//     { label: "Award & Leaderships", slug: "award-leadership" },
//     { label: "Languages & Interests", slug: "languages-interests" },
//   ];

//   return (
//     <div className="bg-[#010912] w-[285px] flex flex-col z-20 pt-2">
//       <div className="flex justify-center items-center  ">
//         <span className="text-neutral-400 font-bold">Dashboard</span>
//       </div>

//       <ul className="flex flex-col justify-start pl-8 gap-[15px] pb-12">
//         {menuItems.map((item) => (
//           <li
//             key={item.slug}
//             onClick={() => {
//               setActive(item.label);
//               router.push(`/design/${item.slug}`);
//             }}
//             className={clsx({
//               "text-neutral-400": active !== item.label,
//               "text-white": active === item.label,
//               "cursor-pointer": true,
//             })}
//           >
//             {item.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
