"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyRecommendations, dummyAuthors } from '@/app/data/book';
import Header from '@/components/Header';
import { Suspense } from 'react';
export default function RecommendationDetailPage() {
  const { recommendationname } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (recommendationname) {
      const formattedTitle = decodeURIComponent(recommendationname.replace(/-/g, ' '));
      const foundRecommendation = dummyRecommendations.find(r => r.title.toLowerCase() === formattedTitle.toLowerCase());
      if (foundRecommendation) {
        setRecommendation(foundRecommendation);
        const foundAuthor = dummyAuthors.find(a => a.id === foundRecommendation.authorId);
        setAuthor(foundAuthor);
      }
    }
  }, [recommendationname]);

  if (!recommendation) {
    return (
      <>
      <Suspense>

        <Header />
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Recommendation Not Found</h1>
            <p className="text-xl">Sorry,  for.</p>
          </div>
        </div>
        </Suspense>

      </>
    );
  }

  return (
    <>
          <Suspense>

      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={recommendation.cover}
                alt={`${recommendation.title} cover`}
                width={300}
                height={450}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{recommendation.title}</h1>
              {author && (
                <Link href={`/authors/${encodeURIComponent(author.name.toLowerCase().replace(/ /g, '-'))}`}>
                  <p className="text-2xl mb-4 hover:text-blue-400 transition-colors duration-300">by {author.name}</p>
                </Link>
              )}
              <p className="text-xl mb-6">{recommendation.description}</p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">Why We Recommend This Book</h2>
                <p className="text-lg">
                  This book has been carefully selected for its outstanding quality, engaging narrative, and potential to inspire and educate readers. It represents the best in its genre and is sure to provide a memorable reading experience.
                </p>
              </div>
            </div>
          </div>
          
          {author && (
            <div className="mt-12">
              <h2 className="text-3xl font-semibold mb-4">About the Author</h2>
              <div className="bg-gray-800 p-6 rounded-lg flex items-center">
                <Image
                  src={author.image || '/placeholder-author.jpg'}
                  alt={author.name}
                  width={100}
                  height={100}
                  className="rounded-full mr-6"
                />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{author.name}</h3>
                  <p className="text-lg">Total Books: {author.books}</p>
                  <Link href={`/authors/${encodeURIComponent(author.name.toLowerCase().replace(/ /g, '-'))}`}>
                    <p className="mt-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">View Author Profile</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </Suspense>

    </>
  );
}