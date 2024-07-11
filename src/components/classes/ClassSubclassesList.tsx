import { SubclassesListProps } from "src/lib/declarations/interfaces";
import { textTransformPascal } from "src/lib/handlers/handlersStyles";
import Link from "next/dist/client/link";

export default function ClassSubclassesList(props: SubclassesListProps) {
  const capitalizedClass = textTransformPascal(props.mainclass);
  return (
    <p>
      <span
        className={`titleSubClassList titleSubClassList${capitalizedClass}`}
      >
        They can choose between {`${props.num}`} main subclasses:
      </span>
      <ol className={`subClassList subClassList${capitalizedClass}`}>
        {props.subclasses.map((subclass, i) => {
          try {
            const capitalizedSubClass = textTransformPascal(subclass);
            return (
              <li
                className={`subClassItem subClassItem${capitalizedClass}`}
                id={`subclassItem${capitalizedClass}-${capitalizedSubClass}`}
                key={`subclass_${capitalizedClass}_${i}`}
              >
                <strong>
                  <Link
                    href={`/classes/${props.mainclass
                      .replaceAll("__", "/")
                      .toLowerCase()}/${subclass
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    id={`anchor${capitalizedClass}-${capitalizedSubClass}`}
                  >{`${capitalizedSubClass}`}</Link>
                </strong>
              </li>
            );
          } catch (e) {
            console.error(
              `Error executing iteration ${i} for subclasses filling:${
                (e as Error).message
              }`
            );
            return <></>;
          }
        })}
      </ol>
    </p>
  );
}
