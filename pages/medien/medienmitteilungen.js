import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MyHead from "../../components/MyHead";
import NavigatorPages from "../../components/navigatorPages";

export default function medienmitteilungen() {
  return (
    <>
      <MyHead />
      <Header media="true" />
      <NavigatorPages />
      <Footer />
    </>
  );
}
