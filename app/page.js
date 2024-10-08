"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ThumbsUp, BookOpen, Book, BookMarked } from 'lucide-react';
import { dummyBooks, dummyRecommendations, dummyAuthors } from './data/book';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

const placeholderImage = '/authorthumbnail.webp';

const StarRating = ({ rating }) => {
  const validRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;

  return (
    <Suspense fallback={<div>Loading stars...</div>}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < fullStars ? "gold" : (i === fullStars && hasHalfStar ? "gold" : "none")}
            stroke="gold"
            strokeWidth={2}
            className={i < fullStars ? "text-yellow-400" : "text-gray-400"}
          />
        ))}
        <span className="ml-2 text-white text-sm">{validRating.toFixed(1)}</span>
      </div>
    </Suspense>
  );
};

const BookButton = ({ Icon, label }) => (
  <button className="flex items-center justify-center w-full p-2 bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
    <Icon size={16} className="mr-2" />
    {label}
  </button>
);

const AuthorCard = ({ author, bookCount, onClick }) => (
  <div 
    className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer" 
    onClick={onClick}
  >
    <Image
      src={author.image || placeholderImage}
      alt={`${author.name}`}
      width={400}
      height={600}
      className="w-full h-auto object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">{author.name}</h3>
      <p className="text-sm mb-2">{bookCount} {bookCount === 1 ? 'Book' : 'Books'}</p>
    </div>
  </div>
);

const RecommendationCard = ({ recommendation, onClick }) => {
  const author = dummyAuthors.find(author => author.id === recommendation.authorId);
  const book = dummyBooks.find(book => book.id === recommendation.bookId);

  return (
    <Suspense fallback={<div>Loading recommendation...</div>}>
      <div
        key={recommendation.id}
        className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
        onClick={() => onClick(recommendation)}
      >
        <Image
          src={recommendation.cover}
          alt={`${recommendation.title} cover`}
          width={400}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-2">{recommendation.title}</h3>
            <p className="text-sm mb-2">{author?.name} ({book?.category})</p>
            <StarRating rating={recommendation.rating} />
          </div>
          <div className="flex flex-col w-full space-y-2 mt-4">
            <BookButton Icon={ThumbsUp} label="Recommend" />
            <BookButton Icon={BookOpen} label="Want to Read" />
            <BookButton Icon={Book} label="Read" />
            <BookButton Icon={BookMarked} label="Currently Reading" />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default function NextBookHomepage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter books based on category and search term
    const books = dummyBooks.filter(book => {
      const author = dummyAuthors.find(author => author.id === book.authorId);
      return (
        (selectedCategory === 'All' || selectedCategory === book.category) &&
        (
          book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          author?.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          book.category.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    });

    // Only filter authors if the "Authors" category is selected
    const authors = selectedCategory === 'Authors'
      ? dummyAuthors.filter(author =>
          author.name.toLowerCase().includes(lowerCaseSearchTerm)
        )
      : [];

    // Only filter recommendations if the "Recommendations" category is selected
    const recommendations = selectedCategory === 'Recommendations'
      ? dummyRecommendations.filter(recommendation => {
          const author = dummyAuthors.find(author => author.id === recommendation.authorId);
          return (
            recommendation.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            author?.name.toLowerCase().includes(lowerCaseSearchTerm)
          );
        })
      : [];

    // Update state based on the selected category
    setFilteredBooks(books);
    setFilteredAuthors(authors);
    setFilteredRecommendations(recommendations);
  }, [selectedCategory, searchTerm]);

  const handleBookClick = (book) => {
    router.push(`/book/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleAuthorClick = (author) => {
    router.push(`/authors/${encodeURIComponent(author.name.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleRecommendationClick = (rec) => {
    router.push(`/recommendations/${encodeURIComponent(rec.title.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <div className="min-h-screen text-gray-100">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
    
      </Suspense>
      <div className="flex flex-col items-center pt-10 px-4">
        <div className="text-6xl font-bold mb-8 text-yellow-300">Where knowledge begins  </div>
        <div className="w-full max-w-2xl mb-6">
          <Suspense fallback={<div>Loading search...</div>}>
            <input
              type="text"
              placeholder={`Search ${selectedCategory.toLowerCase()}`}
              className="w-full p-4 text-xl rounded-lg border-2 border-blue-500 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Suspense>
        </div>
        <div className="flex flex-wrap justify-center max-w-4xl mb-8">
          <Suspense fallback={<div>Loading categories...</div>}>
            {['All', 'Recommendations', 'Authors', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'History', 'Self-Help', 'Business', 'Travel'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`m-2 px-4 py-2 rounded-full text-2xl font-sans font-semibold transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-900 text-gray-300'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-900'
                } shadow-md`}
              >
                {category}
              </button>
            ))}
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{selectedCategory}</h2>

        <Suspense fallback={<div>Loading recommendations...</div>}>
          {/* Render Recommendations */}
          {selectedCategory === 'Recommendations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onClick={handleRecommendationClick}
                />
              ))}
            </div>
          )}
        </Suspense>


        <Suspense fallback={<div>Loading authors...</div>}>
          {/* Render Authors */}
          {selectedCategory === 'Authors' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredAuthors.map((author) => (
                <AuthorCard
                  key={author.id}
                  author={author}
                  bookCount={dummyBooks.filter(book => book.authorId === author.id).length}
                  onClick={() => handleAuthorClick(author)}
                />
              ))}
            </div>
          )}
        </Suspense>

        <Suspense fallback={<div>Loading books...</div>}>
          {/* Render Books */}
          {(selectedCategory !== 'Recommendations' && selectedCategory !== 'Authors') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <RecommendationCard
                  key={book.id}
                  recommendation={{
                    ...book,
                    rating: book.rating,
                    cover: book.cover,
                  }}
                  onClick={() => handleBookClick(book)}
                />
              ))}
            </div>
          )}
        </Suspense>

        {/* No matches found */}
        {filteredAuthors.length === 0 && filteredRecommendations.length === 0 && filteredBooks.length === 0 && (
          <div className="text-white text-center">No matches found.</div>
      

        )}
      </div>
    </div>
  );
}
