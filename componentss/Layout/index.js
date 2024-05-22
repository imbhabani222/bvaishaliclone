import { useEffect } from "react";
import Footer from "../FooterNew/footer";
import FooterInfo from "../FooterNew/footerinfo";
import SeconderyHeader from "../Header/SecondaryHeader/secondaryheader";
import TopHeader from "../Header/TopHeader/topheader";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_SETTINGS } from "../../redux/settings/actions/actions";

function Layout({ children }) {
  const dispatch = useDispatch();

  const data = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const tagLine = data?.tagLine;
  useEffect(() => {
    if (!data) {
      dispatch({ type: FETCH_ALL_SETTINGS });
    }
  }, []);

  return (
    <div className="layout" style={{ position: "relative" }}>
      <>
        <SeconderyHeader tagLine={tagLine} />
        {children}
        <div>
          <FooterInfo data={data} />
        </div>
        <div>
          <Footer />
        </div>
      </>
    </div>
  );
}
export default Layout;
