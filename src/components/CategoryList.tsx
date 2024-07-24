import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <div className="grid sm:grid-cols-8 gap-3 grid-cols-2 w-full ">
      {categories.map(({ name,color }, index) => (

        <Link key={index}
          to={`posts/${name}`}
          className={`p-2 inline-flex text-neutral-700 items-center justify-center text-center w-full text-sm capitalize rounded-lg cursor-pointer hover:bg-gray-100  ${color}`}

        >{name.toLowerCase()}</Link>

      ))}
    </div>
  );
};

export default CategoryList;
const categories = [
  { name: "web development", color: "bg-blue-200" },
  { name: 'tech', color: "bg-rose-200" },
  { name: 'health', color: "bg-yellow-200" },
  { name: "lifestyle", color: "bg-green-200" },
  { name: "business", color: "bg-yellow-200" },
  { name: "entertainment", color: "bg-red-200" },
  { name: "education", color: "bg-rose-200" },
  { name: "science", color: "bg-green-200" },
];
