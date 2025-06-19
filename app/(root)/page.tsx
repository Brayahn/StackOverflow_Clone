import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

import React from "react";
const questions = [
  {
    id: 1,
    title: "How to learn React ",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "JavaScript" },
    ],
    author: [{ id: 1, name: "Elias" }],
    upvotes: 10,
    downvotes: 2,
    views: 100,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "What is the best way to learn Next.js?",
    tags: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "JavaScript" },
    ],
    author: [{ id: 2, name: "John" }],
    upvotes: 5,
    downvotes: 1,
    views: 50,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "How to deploy a Next.js application?",
    tags: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Deployment" },
    ],
    author: [{ id: 3, name: "Alice" }],
    upvotes: 8,
    downvotes: 0,
    views: 30,
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "What is the difference between React and Next.js?",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
    ],
    author: [{ id: 4, name: "Bob" }],
    upvotes: 12,
    downvotes: 3,
    views: 45,
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "How to handle state management in React?",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "State Management" },
    ],
    author: [{ id: 5, name: "Charlie" }],
    upvotes: 10,
    downvotes: 2,
    views: 100,
    createdAt: new Date(),
  },
];
interface SearchParams {
  searchParams: {
    query: string;
    searchParams: Promise<{ [key: string]: string }>;
  };
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions </h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.HOME}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="cursor-pointer"
        />
      </section>
      Home Filter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <h1 className="text-lg font-semibold">{question.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Asked by: {question.author[0].name}</span>
              <span>
                Tags: {question.tags.map((tag) => tag.name).join(", ")}
              </span>
              <span>Upvotes: {question.upvotes}</span>
              <span>Downvotes: {question.downvotes}</span>
              <span>Views: {question.views}</span>
            </div>
            <span className="text-xs text-gray-400">
              Posted on: {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
