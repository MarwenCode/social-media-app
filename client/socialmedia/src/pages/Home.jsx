
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import HomeRightBar from "../components/HomeRightBar";
import Feed from "../components/Feed";
import ProfileRightBar from "../components/ProfileRightBar";
// import Feed from  "../components/Feed";


const Home = () => {
  return (
    <>
    <TopBar  />
    <div className="homeContainer">
      <SideBar />
      <Feed />
      <HomeRightBar/>
     
    </div>
  </>
  )
}

export default Home