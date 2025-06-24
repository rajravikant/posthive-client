import { Link } from "react-router";
import { categories } from "../utils/constants";

const CategoryList = () => {
  return (
    <div className="grid sm:grid-cols-8 gap-3 grid-cols-2 w-full ">
      {categories.slice(0,8).map(({ value,color,label }, index) => (

        <Link key={index}
          to={`posts/${value.toLowerCase()}`}
          className={`p-2 inline-flex text-neutral-700 items-center justify-center text-center w-full text-sm capitalize rounded-lg cursor-pointer hover:bg-gray-100  ${color}`}

        >{label}</Link>

      ))}
    </div>
  );
};

export default CategoryList;
