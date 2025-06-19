"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder?: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false }); // Update the URL with the new search query
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 1000); // Debounce the search input for 1 second

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]); //dependencies array

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4  ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="Search"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchQuery}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-primary-500 text-white py-2 px-4 rounded-[10px]">
        Search
      </button>
    </div>
  );
};

export default LocalSearch;
