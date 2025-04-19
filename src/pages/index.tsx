import { Provider } from "react-redux";
import { landingStore } from "src/redux/landingStore";
import Image from "next/image";
// @ts-ignore
import s from "../styles/modules/landing-page.module.scss";
import LandingWatcher from "src/components/hidden/watchers/LandingWatcher";
export default function LandingPage(): JSX.Element {
  return (
    <Provider store={landingStore}>
      <div className={s.bgWrapper}>
        <Image
          id="anhangaBg"
          loading="eager"
          decoding="async"
          fill
          alt="Deus Anhanga"
          src="/img/dall-e-anhanga.jpeg"
          className={s.anhangaBg}
          priority
        />
      </div>
      <LandingWatcher />
    </Provider>
  );
}
