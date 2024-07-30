import { useEffect } from "react"

const Dashboard = () => {
    useEffect(() => {
        testf();
    }, [])
   const testf =()=>{
        const menuItem=[
            {
                path:"/dashboard",
                name:"Dashboard",
                icon:"<DashboardIcon/>"
            },
            {
                path:"/about",
                name:"About",
                icon:""
            },
            {
                path:"/home",
                name:"Home",
                icon:"<HomeIcon/>"
            },
            {
                path:"/comment",
                name:"Comment",
                icon:""
            },
            {
                path:"/product",
                name:"Product",
                icon:""
            },
            {
                path:"/productList",
                name:"Product List",
                icon:""
            }
        ]
        menuItem.map(({path,name,icon}) => (
            console.log(name)
        ))
   }
  return (
    <div>Dashboard</div>
  )
}
export default Dashboard