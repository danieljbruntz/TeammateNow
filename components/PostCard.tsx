import Link from 'next/link';

interface PostCardProps {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export default function PostCard({ id, title, body, created_at }: PostCardProps) {
  return (
    <Link
      href={`/post/${id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">{new Date(created_at).toLocaleString()}</p>
      <p className="text-gray-700 line-clamp-3">{body}</p>
    </Link>
  );
} 