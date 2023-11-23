import styles from "@/app/_styles/components/settings/optionGroup.module.scss";
import Image from "next/image"


type ImageOption ={ 
  text: string;
  image: string;
}

type Option = string | ImageOption 
type OptionGroup = {
  label: string;
  options: Option[]
};

interface OptionGroupProps extends OptionGroup {
  setPage: (option: string) => void;
  page: string;
  onClick?: (option: string) => void
}

export default function OptionGroup({
  label,
  options,
  page,
  setPage,
  onClick
}: OptionGroupProps) {
  function isImageOption(option: Option): option is ImageOption {
    return typeof option === 'object' && 'image' in option && 'text' in option;
  }
  return (
    <div key={label}>
      <h3>{label}</h3>

      <div key={label} className={styles.group}>
        {options.map((option: Option) => {
          return (

            <div
              key={!isImageOption(option) ? option : option.text }
              onClick={() => {
                if (onClick) onClick(typeof option === "string" ? option : option.text )
                setPage(typeof option === "string" ? option : option.text )
                
              }}
              className={`${((!isImageOption(option) ? option : option.text) === page )? styles.activeOption : styles.option} ${!isImageOption(option) ? "" : styles.imageOption}`}
            >

              {isImageOption(option) && option.image && <Image alt="Option image" src={option.image} width={32} height={32} /> }
              <h2>{typeof option === "string" ? option : option.text }</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
