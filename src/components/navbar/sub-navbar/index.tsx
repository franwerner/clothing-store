import SubNavbarNavigationItems from "./NavigationItems.sub-navbar";
import SubNavbarOnScrolling from "./OnScrolling.sub-navbar";

const SubNavbar = () => {

    return (
        <section
            id="sub-navbar"
            className="w-full flex d-flex justify-center h-[var(--subnavbar-heigth)]">
            <SubNavbarNavigationItems />
            <SubNavbarOnScrolling />
        </section>
    );
};

export default SubNavbar;