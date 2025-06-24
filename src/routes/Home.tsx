import { Link } from "react-router";
import CategoryList from "../components/CategoryList";
import RecentBlogs from "../components/RecentBlogs";



const slogans = [
  "We use an agile approach to test assumptions and connect with the needs of your audience early and often.",
  "We are committed to delivering high-quality products that meet the needs of our users.",
  "We believe in the power of collaboration and teamwork to achieve our goals.",
  "We are passionate about creating innovative solutions that make a difference.",
  "We strive to continuously improve and adapt to the changing needs of our users.",
  "We value transparency and open communication with our users.",
  "We are dedicated to providing exceptional customer service and support.",
  "We believe in the importance of user feedback and use it to drive our development process.",
  "We are committed to building a diverse and inclusive community around our products.",
  "We are excited to share our journey with you and look forward to your feedback.",
]

const getTag = ()=>{
  const date = new Date()
  if (date.getHours() < 12) {
    return "morning"
  } else if (date.getHours() < 18) {
    return "afternoon"
  } else {
    return "evening"
  }
}

const Home = () => {
  return (
    <section className="pt-10 lg:max-w-6xl mx-auto px-5 ">
      <div className="lg:mb-16 mb-8">
        <h2 className="mb-4 text-3xl lg:text-5xl  text-gray-900 dark:text-white">
          <span className="font-bold">Good {getTag()}</span> , Welcome to PostHive Blogs
        </h2>
        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
         {slogans[Math.floor(Math.random() * slogans.length)]}
        </p>
        
        <Link to="/blogs" className="mt-10 block w-fit bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
        All Blogs
        </Link>
      </div>


      <div className="popular">
        <h1 className="mb-4 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">Popular Categories</h1>
        <CategoryList/>
      </div>

      <div className="recent-posts w-full py-5 ">
        <h1 className="mt-5 mb-3 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">Recent Posts</h1>
        <RecentBlogs/>
      </div>
    </section>
  );
};

export default Home;
