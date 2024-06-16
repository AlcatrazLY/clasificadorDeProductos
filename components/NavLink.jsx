import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

function NavLink({ children, href, exact, ...props }) {
	const { pathname } = useRouter();
	const isActive = exact ? pathname === href : pathname.startsWith(href);
	const className = isActive ? `${props.className} active` : props.className;

	return (
		<Link href={href} {...props} className={className}>
			{children}
		</Link>
	);
}

NavLink.propTypes = {
	href: PropTypes.string.isRequired,
	exact: PropTypes.bool,
};

NavLink.defaultProps = {
	exact: false,
};

export default NavLink;
