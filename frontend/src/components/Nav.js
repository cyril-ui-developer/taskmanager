import { Link, useLocation } from "react-router-dom";

const Nav = ()=>  {
  const location = useLocation();
  return(
          <div className="center">
          {location.pathname === '/' ? <Link className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-s" to={"/add"}>
            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
</svg>
             Add Task
            </Link> :
            <Link className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-s" to={"/"}>
            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
  <path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/>
</svg>
             Back
            </Link>}  
        </div> 
)}

export default Nav

