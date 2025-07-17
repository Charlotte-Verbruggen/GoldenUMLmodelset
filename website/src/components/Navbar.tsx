import { NavLink } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { Github, Home, Search, Send } from "lucide-react";

const NAV_ITEMS = [
    {
      label: "Home",
      to: "/",
      icon: Home,
    },
    {
      label: "Search",
      to: "/search",
      icon: Search,
    },
  ];

export default function Navbar() {
    return (
        <div className={`flex justify-center w-full`}>
            <nav className={`w-full rounded-2xl shadow flex items-center px-4 py-2 justify-between`}>
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-1">
                        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
                            <NavigationMenuItem key={label}>
                                <NavigationMenuLink asChild>
                                    <NavLink
                                        to={to}
                                        className="flex items-center gap-1 rounded-md px-3 py-2 font-medium transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
                                    >
                                        <Icon size={18} />
                                        {label}
                                    </NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        {/* Submit Button */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <a
                                    href="https://forms.gle/Y4QmXKC5DueQE9u99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 rounded-md px-3 py-2 font-medium transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <Send size={18} />
                                    Submit
                                </a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <a
                href="https://github.com/Charlotte-Verbruggen/GoldenUMLmodelset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
                aria-label="GitHub Repository"
                >
                    <Github size={22} />
                </a>
            </nav>
        </div>
    )       
}