import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
import ClassDescription from "src/components/classes/ClassDescription";
// import { exec } from "child_process";
// import path from "path";

// export async function getServerSideProps() {
//   const result = JSON.parse(
//     await new Promise((resolve, reject) => {
//       exec(`python ${path.resolve("./script.py")}`, (error, stdout, stderr) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         if (stderr) {
//           reject(stderr);
//           return;
//         }
//         resolve(stdout);
//       });
//     })
//   );
//   console.log(result);
//   return {
//     props: { result },
//   };
// }

export default function Fighter() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Fighter"
        imgDir={[
          "/img/classes/warrior/gnome-femalew-warr-1.jpg",
          "/img/classes/warrior/dall-e-indigenous-warrior.jpeg",
          "/img/classes/warrior/dall-e-warrior-human-female-1.jpeg",
          "/img/classes/warrior/dall-e-warrior-orc-blue-1.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Fighter"
            is="are able bodied individuals who chose to focus on their
					physical prowess to take advantage on their adventures and"
            focus="melee"
            complement="combat."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Bruiser", "Rogue", "Swordsman"]}
            mainclass="Fighter"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
