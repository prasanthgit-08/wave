import MenuItems from "../header/MenuItems";
const Dropdown = ({ submenus, dropdown, depthLevel, close }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} close={close} />
      ))}
    </ul>
  );
};

export default Dropdown;
