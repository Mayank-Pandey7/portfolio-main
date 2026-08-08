import { Book, Film } from 'lucide-react';
import React from 'react';

export type PersonalItem = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

export const personalItems: PersonalItem[] = [
  {
    name: 'Books',
    description: 'Books that have influenced my thinking and growth.',
    icon: Book,
    href: '/books',
  },
  {
    name: 'Movies',
    description: 'Films and shows that have inspired and entertained me.',
    icon: Film,
    href: '/movies',
  },
];

export interface BookItem {
  title: string;
  author: string;
  image: string;
}

export interface MovieItem {
  title: string;
  image: string;
}

export const booksData: BookItem[] = [
  {
    title: '48 Laws of Power',
    author: 'Robert Greene',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1694722764i/1303.jpg',
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1404576602i/13099738.jpg',
  },
  {
    title: 'Limitless',
    author: 'Jim Kwik',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577478589i/49994260.jpg',
  },
  {
    title: 'Surrounded by Idiots',
    author: 'Thomas Erikson',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583763517i/39101777.jpg',
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg',
  },
  {
    title: "Can't Hurt Me",
    author: 'David Goggins',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1536184191i/41721428.jpg',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg',
  },
  {
    title: 'Mastery',
    author: 'Robert Greene',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348274726i/13589182.jpg',
  },
];

export const moviesData: MovieItem[] = [
  {
    title: 'Ford v Ferrari',
    image: 'https://a.ltrbxd.com/resized/film-poster/2/9/1/4/1/9/291419-ford-v-ferrari-0-1000-0-1500-crop.jpg?v=27ed4e72db',
  },
  {
    title: 'Whiplash',
    image: 'https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-1000-0-1500-crop.jpg?v=d13ea36528',
  },
  {
    title: 'The Social Network',
    image: 'https://a.ltrbxd.com/resized/sm/upload/nw/cm/pa/ai/sGQv3ZMZBDBnl3z42Q0mEQ5uiDe-0-1000-0-1500-crop.jpg?v=54ee59f7cd',
  },
  {
    title: 'F1',
    image: 'https://a.ltrbxd.com/resized/film-poster/8/1/7/9/7/7/817977-f1-the-movie-0-1000-0-1500-crop.jpg?v=f5ae2b99b9',
  },
  {
    title: 'Rush',
    image: 'https://a.ltrbxd.com/resized/film-poster/7/9/7/8/7/79787-rush-0-1000-0-1500-crop.jpg?v=ca082886e5',
  },
  {
    title: 'Steve Jobs',
    image: 'https://a.ltrbxd.com/resized/sm/upload/ql/1g/sz/63/7SUaf2UgoY0ZRGbQtRlfDkLDBCb-0-1000-0-1500-crop.jpg?v=867f24dae3',
  },
  {
    title: 'The Founder',
    image: 'https://a.ltrbxd.com/resized/sm/upload/92/i7/c9/p4/fxvlzT7yyKiZneTDPwk85BSw1JF-0-1000-0-1500-crop.jpg?v=5999e6ff06',
  },
  {
    title: 'Silicon Valley',
    image: 'https://a.ltrbxd.com/resized/film-poster/4/8/3/7/5/5/483755-silicon-valley-0-1000-0-1500-crop.jpg?v=ea8a4f74b6',
  },
  {
    title: 'Black Swan',
    image: 'https://a.ltrbxd.com/resized/sm/upload/yt/ae/iz/kj/bIjkE9Og0nulRycj144sCcQcsZ6-0-1000-0-1500-crop.jpg?v=a571e4c644',
  },
  {
    title: 'The Big Short',
    image: 'https://a.ltrbxd.com/resized/film-poster/2/4/6/0/1/3/246013-the-big-short-0-1000-0-1500-crop.jpg?v=53fc881989',
  },
];
