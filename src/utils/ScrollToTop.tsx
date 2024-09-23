import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ children }: any) => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);
	return <div>{children}</div>;
};

export default ScrollToTop;
