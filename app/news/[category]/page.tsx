import fetchNews from "@/lib/fetchNews";
import NewsList from "@/app/NewsList";
import { categories } from "@/constants";
type Props = {
  params: { category: Category };
};
async function NewsCategory({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="text-4-xl font-serif capitalize pt-5  decoration-orange-400 decoration-2 underline-offset-4 decoration-double px-0 no-underline pb-2"></h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}
