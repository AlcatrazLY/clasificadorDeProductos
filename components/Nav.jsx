import { useState } from "react";
import NavLink from "./NavLink"; // Ensure correct import

function Nav() {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<nav className="relative px-4 flex justify-between items-center h-full w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
			<button className="navbar-burger flex items-center text-white p-3 block md:hidden" onClick={() => setShowMenu(!showMenu)}>
				<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
				</svg>
			</button>
			<div className="mx-auto p-6 hidden md:block">
				<ul id="headernav" className="flex items-center space-x-6">
					<li>
						<NavLink className="font-bold text-white hover:text-gray-200" href="/" exact>
							ImgUpload
						</NavLink>
					</li>
					<li>
						<NavLink className="font-bold text-white hover:text-gray-200" href="/events">
							Events
						</NavLink>
					</li>
				</ul>
			</div>
			{showMenu && (
				<div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-20 md:hidden">
					<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-20">
						<div className="px-5 pt-4 flex items-center justify-between z-20">
							<div className="mr-2 z-20">
								<button
									type="button"
									className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
									onClick={() => setShowMenu(false)}
								>
									<span className="sr-only">Close main menu</span>
									<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>
						<div className="px-2 pt-2 pb-3 space-y-1 z-20">
							<NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} href="/" exact>
								ImgUpload
							</NavLink>
							<NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} href="/events">
								Events
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Nav;
