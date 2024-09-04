"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dummyAuthors, dummyBooks } from '@/app/data/book';
import Header from '@/components/Header';

export default function AuthorDetailPage() {
  const { authorname } = useParams();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    if (authorname) {
      const formattedName = decodeURIComponent(authorname.replace(/-/g, ' '));
      const foundAuthor = dummyAuthors.find(a => a.name.toLowerCase() === formattedName.toLowerCase());
      if (foundAuthor) {
        setAuthor(foundAuthor);
        const books = dummyBooks.filter(book => book.authorId === foundAuthor.id);
        setAuthorBooks(books);
      }
    }
  }, [authorname]);

  if (!author) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
            <p className="text-xl">Sorry, we couldn't find the author you're looking for.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <Image
                src={author.image || '/placeholder-author.jpg'}
                alt={`${author.name}`}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
              <p className="text-xl mb-4">Total Books: {author.books}</p>
              {/* Add more author details here if available */}
            </div>
          </div>
          
          <h2 className="text-3xl font-semibold mb-6">Books by {author.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorBooks.map(book => (
              <Link href={`/book/${encodeURIComponent(book.title.toLowerCase().replace(/ /g, '-'))}`} key={book.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    width={200}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-400 mb-2">Rating: {book.rating} / 5</p>
                    <p className="text-sm text-gray-300">{book.description.substring(0, 100)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}