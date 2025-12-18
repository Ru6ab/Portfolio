// 'use client';

// import clsx from "clsx";
// import Image from "next/image";
// import { IoLogoTwitter } from "react-icons/io";
// import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function SideNav() {
//   const [active, setActive] = useState("Home");
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

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

//   // ✅ Default / dummy profile data
//   const defaultProfile = {
//     name: "Rubab",
//     img: "/assets/placeholderImg.jpg",
//     social: {
//       twitter: "",
//       facebook: "",
//       github: "",
//       linkedin: "",
//     },
//   };

//   // ✅ Fetch profile data
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await axios.get("/api/userportfolio/profile");
//         // Normalize the fetched data, fallback to defaults if empty
//         const profileData = res.data?.data || {};
//         const normalizedProfile = {
//           name: profileData.name || defaultProfile.name,
//           img: profileData.img || defaultProfile.img,
//           social: {
//             twitter: profileData.twitterUrl || "",
//             facebook: profileData.facebookUrl || "",
//             github: profileData.gitHubUrl || "",
//             linkedin: profileData.linkedInUrl || "",
//           },
//         };
//         setProfile(normalizedProfile);
//       } catch (error) {
//         console.error("Profile fetch failed, using default:", error);
//         setProfile(defaultProfile);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div className="text-white p-4">Loading...</div>;
//   }

//   const { name, img, social } = profile || defaultProfile;

//   return (
//     <div className="bg-[#010912] w-[285px] flex flex-col z-20 pt-4">
      
//       {/* Profile Section */}
//       <div className="flex flex-col items-center">
//         <div className="bg-[#212731] p-2 rounded-full">
//           <Image
//             src={img || defaultProfile.img}
//             alt="profile"
//             width={110}
//             height={110}
//             className="rounded-full bg-[#212529]"
//           />
//         </div>

//         <h1 className="font-bold text-[23px] my-3 text-white">{name}</h1>

//         {/* Social Icons */}
//         <div className="flex flex-row gap-2">
//           {social.twitter && (
//             <IoLogoTwitter
//               className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
//               fontSize={33}
//               onClick={() => window.open(social.twitter, "_blank")}
//             />
//           )}
//           {social.facebook && (
//             <FaFacebookF
//               className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
//               fontSize={33}
//               onClick={() => window.open(social.facebook, "_blank")}
//             />
//           )}
//           {social.github && (
//             <FaGithub
//               className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
//               fontSize={33}
//               onClick={() => window.open(social.github, "_blank")}
//             />
//           )}
//           {social.linkedin && (
//             <FaLinkedinIn
//               className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
//               fontSize={33}
//               onClick={() => window.open(social.linkedin, "_blank")}
//             />
//           )}
//         </div>
//       </div>

//       {/* Menu */}
//       <ul className="mt-8 flex flex-col justify-start pl-8 gap-[15px] pb-12">
//         {menuItems.map((item) => (
//           <li key={item}>
//             <a
//               href={`#${item}`}
//               onClick={() => setActive(item)}
//               className={clsx({
//                 "text-neutral-400": active !== item,
//                 "text-white": active === item,
//               })}
//             >
//               {item}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


'use client';

import clsx from "clsx";
import Image from "next/image";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SideNav() {
  const [active, setActive] = useState("Home");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    "Home",
    "About",
    "Education",
    "Skills",
    "Projects",
    "Publications",
    "Award & Leaderships",
    "Languages & Interests",
  ];

  // ✅ Default / dummy profile data
  const defaultProfile = {
    name: "",
    img: "/assets/placeholderImg.jpg",
    social: {
      twitter: "",
      facebook: "",
      github: "",
      linkedin: "",
    },
  };

  // ✅ Fetch profile data
  // useEffect(() => {
  //   async function fetchProfile() {
  //     try {
  //       const res = await axios.get("/api/userportfolio/profile");
  //       console.log("API response:", res.data);
  //       console.log("profile",res.data)

  //       // Access nested profile object from API
  //       const profileData = res.data?.data?.profile || {};

  //       const normalizedProfile = {
  //         name: profileData.name || defaultProfile.name,
  //         img: profileData.img || defaultProfile.img,
  //         social: {
  //           twitter: profileData.twitterUrl || "",
  //           facebook: profileData.facebookUrl || "",
  //           github: profileData.gitHubUrl || "",
  //           linkedin: profileData.linkedInUrl || "",
  //         },
  //       };

  //       setProfile(normalizedProfile);
  //     } catch (error) {
  //       console.error("Profile fetch failed, using default:", error);
  //       setProfile(defaultProfile);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProfile();
  // }, []);

  useEffect(() => {
  async function fetchProfile() {
    try {
      const res = await axios.get("/api/userportfolio/profile");
      console.log("API response:", res.data);

      // profile is returned directly in data
      const profileData = res.data?.data || {};

      const normalizedProfile = {
        name: profileData.name || defaultProfile.name,
        img: profileData.img || defaultProfile.img,
        social: {
          twitter: profileData.twitterUrl || "",
          facebook: profileData.facebookUrl || "",
          github: profileData.gitHubUrl || "",
          linkedin: profileData.linkedInUrl || "",
        },
      };
           

      setProfile(normalizedProfile);
       console.log("Profile name after normalization:", normalizedProfile.name);
    } catch (error) {
      console.error("Profile fetch failed, using default:", error);
      setProfile(defaultProfile);
    } finally {
      setLoading(false);
    }
  }

  fetchProfile();
}, []);


  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  const { name, img, social } = profile || defaultProfile;

  return (
    <div className="bg-[#010912] w-[285px] flex flex-col z-20 pt-4">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="bg-[#212731] p-2 rounded-full">
          <Image
            src={img || defaultProfile.img}
            alt="profile"
            width={110}
            height={110}
            className="rounded-full bg-[#212529]"
          />
        </div>

        <h1 className="font-bold text-[23px] my-3 text-white">{name}</h1>
   

        {/* Social Icons */}
        <div className="flex flex-row gap-2">
          {social.twitter && (
            <IoLogoTwitter
              className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
              fontSize={33}
              onClick={() => window.open(social.twitter, "_blank")}
            />
          )}
          {social.facebook && (
            <FaFacebookF
              className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
              fontSize={33}
              onClick={() => window.open(social.facebook, "_blank")}
            />
          )}
          {social.github && (
            <FaGithub
              className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
              fontSize={33}
              onClick={() => window.open(social.github, "_blank")}
            />
          )}
          {social.linkedin && (
            <FaLinkedinIn
              className="text-white bg-[#212731] rounded-full p-2 cursor-pointer"
              fontSize={33}
              onClick={() => window.open(social.linkedin, "_blank")}
            />
          )}
        </div>
      </div>

      {/* Menu */}
      <ul className="mt-8 flex flex-col justify-start pl-8 gap-[15px] pb-12">
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={() => setActive(item)}
              className={clsx({
                "text-neutral-400": active !== item,
                "text-white": active === item,
              })}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

