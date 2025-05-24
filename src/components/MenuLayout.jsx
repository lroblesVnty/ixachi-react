import { Outlet } from "react-router-dom";
import MenuBar from './MenuBar'

const MenuLayout = () => {
  return (
    <div>
      <MenuBar> 
        <Outlet /> {/* Renderiza las rutas hijas */}
      </MenuBar>
    </div>
  );
};

export default MenuLayout;
