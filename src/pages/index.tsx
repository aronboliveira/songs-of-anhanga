import { Provider } from "react-redux";
import { landingStore } from "src/redux/landingStore";
import Image from "next/image";
// @ts-ignore
import s from "../styles/modules/landing-page.module.scss";
import LandingWatcher from "src/components/hidden/watchers/LandingWatcher";
export default function LandingPage(): JSX.Element {
  return (
    <Provider store={landingStore}>
      <figure className={s.bgWrapper}>
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
        <figcaption className={s.anhangaCapt}>
          <blockquote
            style={{
              position: "absolute",
              fontSize: "1.2rem",
              fontWeight: 900,
              width: "50%",
              color: "#fffe",
            }}
          >
            <p>
              In the heart of <u>Brazilian indigenous lore</u> dwells{" "}
              <strong>Anhanga</strong>, the <em>mysterious protector</em> of the
              forests and its creatures. Often depicted as a{" "}
              <b>shape-shifting spirit</b>, this enigmatic entity from{" "}
              <abbr title="Tupi-Guarani mythology">
                <i>Tupi-Guarani </i>
              </abbr>
              traditions is both <em>feared and revered</em>. Legends say
              Anhanga wanders the
              <u> moonlit shadows</u> of the Amazon, guarding sacred lands while
              luring the arrogant or disrespectful into eternal{" "}
              <strong>torment</strong>.
              <br /> <br />
              <i>"Beware the hollow eyes in the dark,"</i> whisper elders,
              <dfn title="a warning or lesson">
                for Anhanga’s presence teaches humility
              </dfn>
              —a reminder that nature’s balance is not to be trifled with.
            </p>
          </blockquote>
        </figcaption>
      </figure>
      <LandingWatcher />
    </Provider>
  );
}
