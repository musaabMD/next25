"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { dummyBooks, dummyAuthors } from '@/app/data/book';
import Header from '@/components/Header';
import { Suspense } from 'react';
export default function BookDetailPage() {
  const { bookname } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (bookname) {
      const formattedTitle = decodeURIComponent(bookname.replace(/-/g, ' '));
      const foundBook = dummyBooks.find(b => b.title.toLowerCase() === formattedTitle.toLowerCase());
      if (foundBook) {
        setBook(foundBook);
        const foundAuthor = dummyAuthors.find(a => a.id === foundBook.authorId);
        setAuthor(foundAuthor);
      }
    }
  }, [bookname]);

  if (!book) {
    return (
      <>
            <Suspense>

        <Header />
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Book Not Found</h1>
            <p className="text-xl">Sorry, we couldn't find the book you're looking for.</p>
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
                src={book.cover}
                alt={`${book.title} cover`}
                width={300}
                height={450}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
              {author && <p className="text-2xl mb-4">by {author.name}</p>}
              <p className="text-xl mb-2">Category: {book.category}</p>
              <p className="text-xl mb-4">Rating: {book.rating} / 5</p>
              <h2 className="text-2xl font-semibold mb-2">Description:</h2>
              <p className="text-lg mb-6">{book.description}</p>
              {author && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">About the Author:</h2>
                  <p className="text-lg">Books by this author: {author.books}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </Suspense>

    </>
  );
}